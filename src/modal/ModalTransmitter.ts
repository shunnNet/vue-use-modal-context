import { defineComponent } from 'vue'
import { useModalTransmitter } from './useModalTransmitter'

export default defineComponent({
  props: {
    accepterName: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    useModalTransmitter(
      props.accepterName,
      Object.entries(slots).reduce((acc, now) => {
        return {
          ...acc,
          [now[0]]: now[1],
        }
      }, {})
    )

    return () => null
  },
})
