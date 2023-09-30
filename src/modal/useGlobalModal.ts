import { inject } from 'vue'

export const useGlobalModal = () => {
  const globalModalMap = inject('globalModalMap')

  if (!globalModalMap) {
    throw new Error(`useGlobalModal need be in GlobalModalContext.`)
  }

  const openGlobalModal = inject('openGlobalModal')
  const patchGlobalModal = inject('patchGlobalModal')
  const closeGlobalModal = inject('closeGlobalModal')

  return {
    openGlobalModal,
    patchGlobalModal,
    closeGlobalModal,
  }
}
