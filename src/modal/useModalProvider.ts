import { inject, onBeforeUnmount } from 'vue'
import type { ModalMap, RegistModal, UnregisterModal } from './types'
import { ContextName } from './constant'

export const useModalProvider = (
  name: string,
  initData: Record<string, any> = {},
  resetAfterClose: boolean = false,
  global: boolean = false
) => {
  const modalMap = inject(global ? ContextName.GlobalModalMap : ContextName.ModalMap, null) as ModalMap | null

  const registerModal = inject(
    global ? ContextName.RegisterGlobalModal : ContextName.RegisterModal,
    null
  ) as RegistModal | null

  const unregisterModal = inject(
    global ? ContextName.UnregisterGlobalModal : ContextName.UnregisterModal,
    null
  ) as UnregisterModal | null

  if (!modalMap || !registerModal || !unregisterModal) {
    throw new Error(`ModalProvider "${name}" need be in ModalContext.`)
  }

  registerModal(name, initData, resetAfterClose)

  onBeforeUnmount(() => {
    unregisterModal(name)
  })

  return {
    modal: modalMap[name],
  }
}
