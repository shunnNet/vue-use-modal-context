<script setup lang="ts">
import { useModalContext, useModalAccepterContext, useGlobalModalContext } from './modal'
import type { ModalProviderSlotPropsDefault } from './modal/ModalProvider'
import Child from './child.vue'

const { openModal, closeModal, patchModal } = useModalContext()
useGlobalModalContext()

useModalAccepterContext()
</script>

<template>
  <div>
    <ElButton type="primary" @click="openModal('Good Modal', { name: 'Good' })"> Open Good Modal </ElButton>
    <ElButton type="warning" @click="patchModal('Good Modal', { id: 123 })"> Patch Good Modal </ElButton>
  </div>
  <div>
    <Child />
    <ModalProvider v-slot="{ modal }: ModalProviderSlotPropsDefault" name="Good Modal" :init-data="{}">
      {{ modal.data }}
      <ElButton @click="closeModal('Good Modal')">Close</ElButton>
      <ElDialog v-model="modal.show">
        <div>I am Good Modal</div>
        <div>
          <ElButton @click="() => modal.close()">Close</ElButton>
        </div>
      </ElDialog>
    </ModalProvider>

    <div class="test">
      <ModalAccepter name="custom">
        <ModalProvider
          v-slot="{ modal }: ModalProviderSlotPropsDefault"
          name="TestGlobalModal"
          global
          :init-data="{ msg: '' }"
        >
          <ElDialog v-model="modal.show">
            <template #default>
              <ModalAccepterSlot name="default" :slot-props="{ name: 'accepter', data: modal.data }" />
            </template>
            <template #footer>
              <ModalAccepterSlot name="footer" :slot-props="{ modal }" />
            </template>
          </ElDialog>
        </ModalProvider>
      </ModalAccepter>
    </div>
  </div>
</template>

<style></style>
