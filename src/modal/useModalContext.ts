import { inject, provide, reactive } from 'vue'
import type { ModalMap, RegistModal, UnregisterModal, OpenModal, CloseModal, PatchModal } from './types'

import { ContextName } from './constant'
import { watch } from 'vue'

const _useModalContext = () => {
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

  provide(ContextName.ModalMap, modalMap)
  provide(ContextName.RegisterModal, registerModal)
  provide(ContextName.UnregisterModal, unregisterModal)

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

  if (inject(ContextName.GlobalModalMap, null)) {
    throw new Error('GlobalModalContext can not under the other GlobalModalContext.')
  }

  provide(ContextName.GlobalModalMap, modalMap)
  provide(ContextName.OpenGlobalModal, openModal)
  provide(ContextName.CloseGlobalModal, closeModal)
  provide(ContextName.PatchGlobalModal, patchModal)
  provide(ContextName.RegisterGlobalModal, registerModal)
  provide(ContextName.UnregisterGlobalModal, unregisterModal)

  return {
    openGlobalModal: openModal,
    closeGlobalModal: closeModal,
    patchGlobalModal: patchModal,
    registerGlobalModal: registerModal,
    unregisterGlobalModal: unregisterModal,
  }
}
