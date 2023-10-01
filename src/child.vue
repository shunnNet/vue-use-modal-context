<script setup lang="ts">
// import { h, onMounted, ref } from 'vue'
import { useGlobalModal } from './modal'
// import Heading from './Heading.vue'
// import { useModalTransmitter } from './modal/useModalTransmitter'

// const message = ref('From Transmitter')
// onMounted(() => {
//   setTimeout(() => {
//     message.value = 'Hello World'
//   }, 2000)
// })
const { openGlobalModal, closeGlobalModal, patchGlobalModal } = useGlobalModal()
// useModalTransmitter('custom', { default: [h('div', '123'), h('span', '222')] })
</script>
<template>
  <div class="child">
    Child
    <div>
      <ElButton @click="openGlobalModal('TestModal', { value: 456 })">Open</ElButton>
      <ElButton @click="closeGlobalModal('TestModal')">Close</ElButton>
      <ElButton @click="patchGlobalModal('TestModal', { name: 'net' })">Patch</ElButton>
    </div>
  </div>
</template>
<style lang="scss"></style>
