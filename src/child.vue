<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
// import { useGlobalModal } from './modal'
// import Heading from './Heading.vue'
import { useModalTransmitter } from './modal/useModalTransmitter'

const message = ref('From Transmitter')
onMounted(() => {
  setTimeout(() => {
    message.value = 'Hello World'
  }, 2000)
})
// const { openGlobalModal } = useGlobalModal()
useModalTransmitter('custom', { default: [h('div', '123'), h('span', '222')] })
</script>
<template>
  <div class="child">
    <!-- <ElButton type="danger" @click="openGlobalModal('TestGlobalModal', { msg: 'From child' })"
      >OpenGlobalModal</ElButton
    > -->
    <!-- <ModalTransmitter accepter-name="custom">
      <template #default="{ name, data }">
        <div>{{ message }}</div>
        <div>{{ name }}</div>
        <div>{{ data.msg }}</div>
      </template>
      <template #footer="{ modal }">
        <footer>
          <ElButton @click="() => modal.close()">close global modal</ElButton>
        </footer>
      </template>
    </ModalTransmitter> -->
  </div>
</template>
<style lang="scss"></style>
