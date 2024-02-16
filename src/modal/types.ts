export type Modal = {
  show: boolean
  data: any
  initValue: any
  close: (data?: any) => void
  open: (data?: any) => void
  patch: (data: ModalData | PatchModalFunctionData) => void
  unwatch: () => void
  wait: Promise<any>
  _resolve: (value: any) => void
}
export type RegistModal = (
  name: string,
  initValue: Record<string, any>,
  resetAfterClose?: boolean
) => void
export type UnregisterModal = (name: string) => void
export type ModalData = Record<string, any>
export type ModalMap = Record<string, Modal>
export type OpenModal<T = any> = (name: keyof ModalMap, data?: ModalData) => Promise<T>
export type PatchModalFunctionData = (data: ModalData) => ModalData
export type PatchModal = (
  name: string,
  patchData: ModalData | PatchModalFunctionData
) => void
export type CloseModal = (name: keyof ModalMap, data?: any) => void
