import ModalContext from './ModalContext.vue'
import ModalProvider from './ModalProvider.vue'
import { Plugin } from 'vue'
import { ContextName } from './constant'
import { createModalContext } from './useModalContext'

export default {
  install(app, options = {}) {
    if (options.component) {
      app.component('ModalContext', ModalContext)
      app.component('ModalProvider', ModalProvider)
    }

    const modalContext = options.context || createModalContext()

    app.provide(ContextName.GlobalModalMap, modalContext.modalMap)
    app.provide(ContextName.OpenGlobalModal, modalContext.openModal)
    app.provide(ContextName.CloseGlobalModal, modalContext.closeModal)
    app.provide(ContextName.PatchGlobalModal, modalContext.patchModal)
    app.provide(ContextName.RegisterGlobalModal, modalContext.registerModal)
    app.provide(ContextName.UnregisterGlobalModal, modalContext.unregisterModal)
  },
} as Plugin<
  {
    component?: boolean
    context?: ReturnType<typeof createModalContext>
  }[]
>
