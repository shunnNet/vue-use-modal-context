import ModalContext from './ModalContext'
import ModalProvider from './ModalProvider'
import { Plugin } from 'vue'

export default {
  install(app) {
    app.component('ModalContext', ModalContext)
    app.component('ModalProvider', ModalProvider)
  },
} as Plugin
