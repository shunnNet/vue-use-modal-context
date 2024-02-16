import ModalContext from './ModalContext.vue'
import ModalProvider from './ModalProvider.vue'

import {
  useModalContext,
  useGlobalModalContext,
  createModalContext,
  provideModalContext,
  provideModalContextGlobal,
} from './useModalContext'

import ModalContextPlugin from './install.js'

export {
  ModalContext,
  ModalProvider,
  ModalContextPlugin,
  useModalContext,
  useGlobalModalContext,
  createModalContext,
  provideModalContext,
  provideModalContextGlobal,
}

export * from './useModalProvider'

export * from './types'
