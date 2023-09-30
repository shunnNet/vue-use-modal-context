// src/global-components.d.ts
import { ModalCaster, ModalContext, ModalProvider } from './modal'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ModalCaster: typeof ModalCaster
    ModalContext: typeof ModalContext
    ModalProvider: typeof ModalProvider
  }
}
