import ModalContext from './ModalContext.vue'
import ModalProvider from './ModalProvider.vue'
import { Plugin } from 'vue'

export default {
  install(app) {
    app.component('ModalContext', ModalContext)
    app.component('ModalProvider', ModalProvider)
  },
} as Plugin
