import { inject, provide, reactive } from 'vue'
import type { ModalMap, RegistModal, UnregisterModal, OpenModal, CloseModal, PatchModal } from './types'

import { ContextName } from './constant'
import { watch } from 'vue'

export const createModalContext = () => {
  const modalMap: ModalMap = reactive({})
  const registerModal: RegistModal = (name, initValue, resetAfterClose = false) => {
    modalMap[name] = {
      show: false,
      data: initValue || {},
      initValue: initValue || {},
      open: (data) => openModal(name, data),
      close: () => closeModal(name, resetAfterClose),
      patch: (data) => patchModal(name, data),
      unwatch: () => {},
    }

    modalMap[name].unwatch = watch(
      () => modalMap[name].show,
      (_, oldVal) => {
        if (oldVal === true && resetAfterClose) {
          modalMap[name].data = modalMap[name].initValue
        }
      }
    )
  }
  const unregisterModal: UnregisterModal = (name) => {
    checkModalExistedOrThrow(name)
    modalMap[name].close()
    delete modalMap[name]
  }
  const openModal: OpenModal = (name, data) => {
    checkModalExistedOrThrow(name)
    modalMap[name].show = true
    if (data) {
      modalMap[name].data = data
    }
  }

  const closeModal: CloseModal = (name) => {
    checkModalExistedOrThrow(name)
    if (modalMap[name].show) {
      modalMap[name].show = false
    }
  }
  const patchModal: PatchModal = (name, patchData = {}) => {
    checkModalExistedOrThrow(name)
    if (typeof patchData === 'function') {
      modalMap[name].data = {
        ...modalMap[name].data,
        ...patchData(modalMap[name].data),
      }
    } else {
      modalMap[name].data = {
        ...modalMap[name].data,
        ...patchData,
      }
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

export const provideModalContext = (modalContext: ReturnType<typeof createModalContext>) => {
  provide(ContextName.ModalMap, modalContext.modalMap)
  provide(ContextName.RegisterModal, modalContext.registerModal)
  provide(ContextName.UnregisterModal, modalContext.unregisterModal)
}
export const provideModalContextGlobal = (modalContext: ReturnType<typeof createModalContext>) => {
  if (inject(ContextName.GlobalModalMap, null)) {
    throw new Error('GlobalModalContext can not under the other GlobalModalContext.')
  }

  provide(ContextName.GlobalModalMap, modalContext.modalMap)
  provide(ContextName.OpenGlobalModal, modalContext.openModal)
  provide(ContextName.CloseGlobalModal, modalContext.closeModal)
  provide(ContextName.PatchGlobalModal, modalContext.patchModal)
  provide(ContextName.RegisterGlobalModal, modalContext.registerModal)
  provide(ContextName.UnregisterGlobalModal, modalContext.unregisterModal)
}

export const useModalContext = () => {
  const modalContext = createModalContext()
  const { openModal, closeModal, patchModal, registerModal, unregisterModal } = modalContext

  provideModalContext(modalContext)

  return {
    openModal,
    closeModal,
    patchModal,
    registerModal,
    unregisterModal,
  }
}

export const useGlobalModalContext = () => {
  const modalContext = createModalContext()
  const { openModal, closeModal, patchModal, registerModal, unregisterModal } = modalContext

  provideModalContextGlobal(modalContext)

  return {
    openGlobalModal: openModal,
    closeGlobalModal: closeModal,
    patchGlobalModal: patchModal,
    registerGlobalModal: registerModal,
    unregisterGlobalModal: unregisterModal,
  }
}
