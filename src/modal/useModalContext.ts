import { inject, provide, reactive } from 'vue'
import type {
  ModalMap,
  RegistModal,
  UnregisterModal,
  OpenModal,
  CloseModal,
  PatchModal,
} from './types'

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
      close: (data) => closeModal(name, data),
      patch: (data) => patchModal(name, data),
      unwatch: () => {},
      wait: Promise.resolve(),
      _resolve: () => {},
    }

    modalMap[name].unwatch = watch(
      () => modalMap[name] && modalMap[name].show,
      (now, oldVal) => {
        if (now === undefined) {
          return
        }
        if (oldVal === true) {
          if (resetAfterClose) {
            modalMap[name].data = modalMap[name].initValue
          }
          modalMap[name]._resolve(undefined)
        }
      }
    )
  }

  const checkModalExistedOrThrow = (name: string) => {
    if (!modalMap[name]) {
      throw new Error(`Modal ${name} is not registered.`)
    }
  }

  const unregisterModal: UnregisterModal = (name) => {
    checkModalExistedOrThrow(name)
    modalMap[name].unwatch()
    delete modalMap[name]
  }
  const openModal: OpenModal = (name, data) => {
    checkModalExistedOrThrow(name)
    modalMap[name].show = true
    if (data) {
      modalMap[name].data = data
    }

    modalMap[name].wait = new Promise((res) => {
      modalMap[name]._resolve = res
    })

    return modalMap[name].wait
  }

  const closeModal: CloseModal = (name, data?: any) => {
    checkModalExistedOrThrow(name)
    if (modalMap[name].show) {
      modalMap[name].show = false
    }
    modalMap[name]._resolve(data)
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

  return {
    modalMap,
    openModal,
    closeModal,
    patchModal,
    registerModal,
    unregisterModal,
  }
}

export const provideModalContext = (
  modalContext: ReturnType<typeof createModalContext>
) => {
  provide(ContextName.ModalMap, modalContext.modalMap)
  provide(ContextName.RegisterModal, modalContext.registerModal)
  provide(ContextName.UnregisterModal, modalContext.unregisterModal)
}
export const provideModalContextGlobal = (
  modalContext: ReturnType<typeof createModalContext>
) => {
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
  const { openModal, closeModal, patchModal, registerModal, unregisterModal } =
    modalContext

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
