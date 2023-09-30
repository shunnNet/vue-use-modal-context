import { useModalProvider } from './useModalProvider'
import { defineComponent } from 'vue'
import type { Modal } from './useModalContext'

export type ModalProviderSlotPropsDefault = {
  modal: Modal
}

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    initData: {
      type: Object,
      default: () => ({}),
    },
    global: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { modal } = useModalProvider(props.name, props.global, props.initData)

    const closeAnd = (fn: () => any) => {
      modal.close()
      fn()
    }

    return () => {
      return slots.default?.({ modal, closeAnd })
    }
  },
})
