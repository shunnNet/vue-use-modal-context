<script setup lang="ts">
import { useGlobalModalContext } from './modal'
import type { ModalProviderSlot, ModalContextSlot } from './modal'

import Child from './child.vue'

useGlobalModalContext()

// const doSomething = () => {
//   console.log(123)
// }
</script>

<template>
  <div>
    <ModalProvider v-slot="{ modal, closeAnd }: ModalProviderSlot" name="TestModal" :init-data="{ value: 123 }" global>
      {{ modal }}
      <div>
        <ElButton @click="closeAnd(() => modal.patch({ name: 'net' }))"> Close TestModal </ElButton>
        <ElButton @click="modal.show = false"> Close TestModal2 </ElButton>
      </div>
    </ModalProvider>
    <Child />

    <div>
      <div>Local Modal</div>
      <ModalContext v-slot="{ openModal, closeModal }: ModalContextSlot">
        <ElButton @click="openModal('TestModal', { data: 123 })"> open local</ElButton>
        <ElButton @click="closeModal('TestModal')"> close local</ElButton>
        <ModalProvider v-slot="{ modal }" name="TestModal" reset-after-close>
          {{ modal }}
        </ModalProvider>
      </ModalContext>
    </div>
  </div>
</template>

<style></style>
