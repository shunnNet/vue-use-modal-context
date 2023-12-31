import ModalContext from './ModalContext'
import ModalProvider from './ModalProvider'
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
