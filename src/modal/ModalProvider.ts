import { useModalProvider } from './useModalProvider'
import { defineComponent } from 'vue'

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
    resetAfterClose: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { modal } = useModalProvider(props.name, props.initData, props.resetAfterClose, props.global)

    const closeAnd = (fn: () => any) => {
      modal.close()
      fn()
    }

    return () => {
      return slots.default?.({ modal, closeAnd })
    }
  },
})
