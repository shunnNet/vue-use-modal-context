import { inject, provide, reactive } from 'vue'

export type Modal = {
  show: boolean
  data: any
  initValue: any
  close: () => void
  open: (data: any) => void
  patch: (data: any) => void
}
export type RegistModal = (name: string, initValue?: any) => void
export type UnregisterModal = (name: string) => void
export type ModalData = Record<string, any>
export type ModalMap = Record<string, Modal>
export type OpenModal = (name: string, data?: ModalData) => void
export type PatchModal = (name: string, patchData: ModalData) => void
export type CloseModal = (name: string) => void

const _useModalContext = () => {
  const modalMap: ModalMap = reactive({})
  const registerModal: RegistModal = (name, initValue) => {
    modalMap[name] = {
      show: false,
      data: initValue || {},
      initValue: initValue || {},
      open: (data) => openModal(name, data),
      close: () => closeModal(name),
      patch: (data: ModalData) => patchModal(name, data),
    }
  }
  const unregisterModal: UnregisterModal = (name) => {
    checkModalExistedOrThrow(name)
    const modal = modalMap[name]
    modal.close()
  }
  const openModal: OpenModal = (name, data = {}) => {
    checkModalExistedOrThrow(name)
    modalMap[name].show = true
    modalMap[name].data = data
  }

  const closeModal: CloseModal = (name) => {
    checkModalExistedOrThrow(name)
    if (modalMap[name].show) {
      modalMap[name].show = false
    }
  }
  const patchModal: PatchModal = (name, patchData = {}) => {
    checkModalExistedOrThrow(name)
    modalMap[name].data = {
      ...modalMap[name].data,
      ...patchData,
    }
  }

  const checkModalExistedOrThrow = (name: string) => {
    if (!modalMap[name]) {
      throw new Error(`Modal ${name} is not registered.`)
    }
  }

  return {
    modalMap,
    openModal,
    closeModal,
    patchModal,
    registerModal,
    unregisterModal,
  }
}

export const useModalContext = () => {
  const { modalMap, openModal, closeModal, patchModal, registerModal, unregisterModal } = _useModalContext()

  provide('modalMap', modalMap)
  provide('registerModal', registerModal)
  provide('unregisterModal', unregisterModal)

  return {
    openModal,
    closeModal,
    patchModal,
    registerModal,
    unregisterModal,
  }
}

export const useGlobalModalContext = () => {
  const { modalMap, openModal, closeModal, patchModal, registerModal, unregisterModal } = _useModalContext()

  if (inject('globalModalMap', null)) {
    throw new Error('GlobalModalContext can only be used once.')
  }

  provide('globalModalMap', modalMap)
  provide('openGlobalModal', openModal)
  provide('closeGlobalModal', closeModal)
  provide('patchGlobalModal', patchModal)
  provide('registerGlobalModal', registerModal)
  provide('unregisterGlobalModal', unregisterModal)

  return {
    openGlobalModal: openModal,
    closeGlobalModal: closeModal,
    patchGlobalModal: patchModal,
    registerGlobalModal: registerModal,
    unregisterGlobalModal: unregisterModal,
  }
}
