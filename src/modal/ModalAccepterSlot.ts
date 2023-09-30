import { defineComponent, h, inject, isVNode } from 'vue'
import type { AccepterSlots } from './types'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    slotProps: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const accepter = inject('accepter') as AccepterSlots

    if (!accepter) {
      throw new Error('ModalAccepterSlot need be in ModalAccepter.')
    }

    return () => {
      if (!accepter[props.name]) {
        return null
      }

      if (
        isVNode(accepter[props.name].value) ||
        // @ts-ignore
        (Array.isArray(accepter[props.name].value) && accepter[props.name].value.every(isVNode))
      ) {
        return accepter[props.name].value
      }

      if (typeof accepter[props.name].value === 'function') {
        // @ts-ignore
        return accepter[props.name].value(props.slotProps)
      }

      return h(accepter[props.name].value)
    }
  },
})
