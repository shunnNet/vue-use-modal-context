import type { VNode, Slot, Component, ShallowRef } from 'vue'

export type AccepterMap = Record<string, AccepterSlots>
export type AccepterSlotContent = Slot | Component | VNode[] | VNode
export type AccepterSlots = Record<string, ShallowRef<AccepterSlotContent>>
