import { inject } from 'vue'
import type { ModalMap, OpenModal, PatchModal, CloseModal } from './types'
import { ContextName } from './constant'

export const useGlobalModal = () => {
  const globalModalMap = inject(ContextName.GlobalModalMap, null) as ModalMap | null
  const openGlobalModal = inject(ContextName.OpenGlobalModal, null) as OpenModal | null
  const patchGlobalModal = inject(ContextName.PatchGlobalModal, null) as PatchModal | null
  const closeGlobalModal = inject(ContextName.CloseGlobalModal, null) as CloseModal | null

  if (!globalModalMap || !openGlobalModal || !patchGlobalModal || !closeGlobalModal) {
    throw new Error(`useGlobalModal need be in GlobalModalContext.`)
  }

  return {
    openGlobalModal,
    patchGlobalModal,
    closeGlobalModal,
  }
}
