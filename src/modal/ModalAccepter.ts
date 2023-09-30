import { defineComponent, inject, provide } from 'vue'
import type { RegisterAccepter } from './useModalAcceptorContext'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const accepterMap = inject('accepterMap')
    const registerAccepter = inject('registerAccepter', null) as RegisterAccepter | null

    if (!accepterMap || !registerAccepter) {
      throw new Error(`ModalAccepter ${props.name} need be in ModalAccepterContext.`)
    }

    const accepter = registerAccepter(props.name)

    provide('accepter', accepter)

    return () => {
      return slots.default?.()
    }
  },
})
