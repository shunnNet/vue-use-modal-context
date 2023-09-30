import { inject, onMounted, shallowRef } from 'vue'
import { AccepterSlotContent, AccepterSlots } from './types'

type UseModalTransmitter = (
  accepterName: string,
  slots: Record<string, AccepterSlotContent>
) => {
  transmitModalSlot: (name: string, slot: any) => void
}
export const useModalTransmitter: UseModalTransmitter = (accepterName: string, slots) => {
  const accepterMap = inject('accepterMap') as Record<string, AccepterSlots>

  if (!accepterMap) {
    throw new Error(`ModalTransmitter need be in ModalAccepterContext.`)
  }

  onMounted(() => {
    const accepter = accepterMap[accepterName]

    if (!accepter) {
      throw new Error(`ModalAccepter ${accepterName} is not registered.`)
    }

    Object.entries(slots).forEach(([name, slot]) => {
      accepter[name] = shallowRef(slot)
    })
  })

  const transmitModalSlot = (name: string, slot: AccepterSlotContent) => {
    const accepter = accepterMap[accepterName]

    if (!accepter) {
      throw new Error(`ModalAccepter ${name} is not registered.`)
    }

    accepter[name].value = slot
  }

  return {
    transmitModalSlot,
  }
}
