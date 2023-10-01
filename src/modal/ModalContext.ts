import { defineComponent } from 'vue'
import { useModalContext } from './useModalContext'

export default defineComponent({
  setup(_, { slots, expose }) {
    const { openModal, closeModal, patchModal } = useModalContext()

    expose({ openModal, closeModal, patchModal })

    return () => {
      return slots.default?.({ openModal, closeModal, patchModal })
    }
  },
})
