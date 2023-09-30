import ModalContext from './ModalContext'
import ModalProvider from './ModalProvider'
import ModalAccepter from './ModalAccepter'
import ModalAccepterSlot from './ModalAccepterSlot'
import ModalTransmitter from './ModalTransmitter'
import { Plugin } from 'vue'

export default {
  install(app) {
    app.component('ModalContext', ModalContext)
    app.component('ModalProvider', ModalProvider)
    app.component('ModalAccepter', ModalAccepter)
    app.component('ModalAccepterSlot', ModalAccepterSlot)
    app.component('ModalTransmitter', ModalTransmitter)
  },
} as Plugin
