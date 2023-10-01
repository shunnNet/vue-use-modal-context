export type Modal = {
  show: boolean
  data: any
  initValue: any
  close: () => void
  open: (data?: any) => void
  patch: (data: ModalData | PatchModalFunctionData) => void
  unwatch: () => void
}
export type RegistModal = (name: string, initValue: Record<string, any>, resetAfterClose?: boolean) => void
export type UnregisterModal = (name: string) => void
export type ModalData = Record<string, any>
export type ModalMap = Record<string, Modal>
export type OpenModal = (name: string, data?: ModalData) => void
export type PatchModalFunctionData = (data: ModalData) => ModalData
export type PatchModal = (name: string, patchData: ModalData | PatchModalFunctionData) => void
export type CloseModal = (name: string, resetAfterClose?: boolean) => void

export type ModalProviderSlot = {
  modal: Modal
  closeAnd: (fn: () => any) => void
}

export type ModalContextSlot = {
  openModal: OpenModal
  closeModal: CloseModal
  patchModal: PatchModal
}
