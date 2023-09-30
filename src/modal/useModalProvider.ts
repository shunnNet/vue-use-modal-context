import { inject, onBeforeUnmount, provide } from 'vue'
import type { ModalMap, RegistModal, UnregisterModal } from './useModalContext'

export const useModalProvider = (name: string, global: boolean, initData?: any) => {
  const modalMap = inject<ModalMap>(global ? 'globalModalMap' : 'modalMap')
  const registerModal = inject<RegistModal>(global ? 'registerGlobalModal' : 'registerModal')
  const unregisterModal = inject<UnregisterModal>(global ? 'unregisterGlobalModal' : 'unregisterModal')

  if (!modalMap || !registerModal || !unregisterModal) {
    throw new Error(`ModalProvider "${name}" need be in ModalContext.`)
  }

  registerModal(name, initData)

  provide('modal', modalMap[name])

  onBeforeUnmount(() => {
    unregisterModal(name)
  })

  return {
    modal: modalMap[name],
  }
}
