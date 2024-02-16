<script setup lang="ts">
// import { useGlobalModalContext } from './modal'
import { useModalContext, useGlobalModalContext } from './modal'
import { onMounted } from 'vue'
import Child from './child.vue'

// const doSomething = () => {
//   console.log(123)
// }
const { openModal, closeModal } = useModalContext()
const { openGlobalModal, closeGlobalModal } = useGlobalModalContext()
onMounted(() => {
  // openModal('TestModal', { data: 123 })
  openGlobalModal('TestModal', { data: 123 })
})
</script>

<template>
  <div>
    <ElButton @click="openGlobalModal('TestModal')" type="primary"
      >Open Global Modal</ElButton
    >
    <ElButton @click="closeGlobalModal('TestModal')" type="warning"
      >Close Global Modal</ElButton
    >
    <hr />
    <ModalProvider
      v-slot="{ modal, closeAnd }"
      name="TestModal"
      :init-data="{ value: 123 }"
      global
    >
      <ElDialog v-model="modal.show"></ElDialog>
      {{ modal }}
      <div>
        <ElButton @click="closeAnd(() => modal.patch({ name: 'net' }))">
          Close TestModal
        </ElButton>
        <ElButton @click="modal.show = false"> Close TestModal2 </ElButton>
      </div>
    </ModalProvider>
    <Child />

    <div>
      <div>Local Modal</div>

      <ElButton @click="openModal('TestModal', { data: 123 })"> open local</ElButton>
      <ElButton @click="closeModal('TestModal')"> close local</ElButton>
      <ModalProvider v-slot="{ modal }" name="TestModal" reset-after-close>
        <ElDialog v-model="modal.show"></ElDialog>
        {{ modal }}
      </ModalProvider>
    </div>
  </div>
</template>

<style></style>
