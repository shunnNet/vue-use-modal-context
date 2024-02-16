import ModalContext from './ModalContext.vue'
import ModalProvider from './ModalProvider.vue'
import { useGlobalModal } from './useGlobalModal'
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
  useGlobalModal,
  useGlobalModalContext,
  createModalContext,
  provideModalContext,
  provideModalContextGlobal,
}

export * from './types'
