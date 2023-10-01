import { ModalContext, ModalProvider } from './modal'

declare module 'vue' {
  export interface GlobalComponents {
    ModalContext: typeof ModalContext
    ModalProvider: typeof ModalProvider
  }
}
