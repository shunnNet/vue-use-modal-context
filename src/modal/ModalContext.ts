import { defineComponent } from 'vue'
import { useModalContext } from './useModalContext'

export type Modal = {
  show: boolean
  data: any
  initValue: any
  close: () => void
  open: (data: any) => void
  unwatch: () => void
}
export type RegistModal = (name: string, initValue?: any) => void
export type UnregisterModal = (name: string) => void

export type ModalMap = Record<string, Modal>
export type OpenModal = (name: string, data?: any) => void
export type CloseModal = (name: string) => void

export default defineComponent({
  setup(_, { slots, expose }) {
    const { openModal, closeModal } = useModalContext()

    expose({ openModal, closeModal })

    return () => {
      return slots.default?.({ openModal, closeModal })
    }
  },
})
