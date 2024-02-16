<script setup lang="ts">
import { useModalContext } from './useModalContext'

const { openModal, closeModal, patchModal } = useModalContext()

defineExpose({
  openModal,
  closeModal,
  patchModal,
})
</script>
<template>
  <slot :open-modal="openModal" :close-modal="closeModal" :patch-modal="patchModal" />
</template>
<style></style>
