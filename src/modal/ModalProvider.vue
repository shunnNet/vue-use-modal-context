<script lang="ts" setup>
import { useModalProvider } from './useModalProvider'
const props = defineProps({
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
})
const { modal } = useModalProvider(
  props.name,
  props.initData,
  props.resetAfterClose,
  props.global
)

const closeAnd = (fn: () => any) => {
  modal.close()
  fn()
}
</script>
<template>
  <slot :modal="modal" :close-and="closeAnd" />
</template>
<style></style>
