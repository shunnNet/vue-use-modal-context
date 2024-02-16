# vue-use-modal-context
這是一個讓使用 modal 更簡便的工具。使用 [Vue 3 `provide` / `inject`](https://vuejs.org/guide/components/provide-inject.html)。請先了解後再使用。

提供開關 modal 以及傳遞資料更簡單的寫法，我想應該可以減輕一些設定 modal 時的工作。

支援 Vue 3+。

不包含 modal 本身。如果你在挑選 modal 的套件，你可以考慮 [vue-final-modal](https://github.com/vue-final/vue-final-modal)。

- [vue-use-modal-context](#vue-use-modal-context)
  - [Install](#install)
  - [Tutorial](#tutorial)
  - [Tutorial - global context](#tutorial---global-context)
    - [setup global modal](#setup-global-modal)
  - [documentation](#documentation)
    - [`useModalContext` and `<ModalContext>`](#usemodalcontext-and-modalcontext)
      - [`<ModalContext>`](#modalcontext)
    - [`useModalProvider` and `<ModalProvider>`](#usemodalprovider-and-modalprovider)
    - [`useGlobalModalContext`](#useglobalmodalcontext)
    - [Types](#types)
      - [Global components type](#global-components-type)


## Install
```sh
npm install vue-use-modal-context
```

你可以使用 plugin 全域註冊元件 `<ModalContext>`, `<ModalProvider>`。
（請傳入 `component: true` ）
```ts
import { ModalContextPlugin } from "vue-use-modal-context"

const app = createApp(App)

app.use(ModalContextPlugin, { component: true })

app.mount('#app')
```

或是直接引入也可以。

```ts
import { ModalContext, ModalProvider } from "vue-use-modal-context"
```

[設定 global component type](#global-components-type)

## Tutorial 
首先看一下一個普通的使用 modal 的範例。

這是我經常遇到的情況：為了設定一個 modal，我需要設定 `show`, `openModal`, `modalData` .....。如果有 10 個 modal，就必須設定 10 次。
```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
const modalData = ref({
  userId: 0
})

const openModal = (userId) => {
  show.value = true
  modalData.userId = userId
}

const onModalClose = () => {
  modalData.userId = 0
}
</script>
<template>
  <div>
    <button @click="openModal(81383)">Show user</button>
    <UserModal v-model="show" :user-id="modalData.userId" @close="onModalClose()">
      <!-- Modal content -->
    </UserModal>
  </div>

</template>
```

現在試著使用 `vue-use-modal-context` 中提供的工具 `useModalContext` 以及 `ModalProvider` 簡化這個範例。首先呼叫 `useModalContext()`，你可以得到 `openModal`

```vue
<!-- Step 1: call useModalContext -->
<script setup>
import { useModalContext, ModalProvider } from "vue-use-modal-context"

const { openModal } = useModalContext()
</script>
<template>
  <div>
    
  </div>
</template>

```

接著你需要加入 `ModalProvider`，將一個 modal 註冊到 `modalContext` 中。我們註冊了一個 modal，名稱是 **UserModal**

```vue
<!-- Step 2: use ModalProvider to register modal -->
<script setup>
import { useModalContext, ModalProvider } from "vue-use-modal-context"

const { openModal } = useModalContext()
</script>
<template>
  <div>
    <ModalProvider name="UserModal">

    </ModalProvider>
  </div>
</template>
```

接著可以從 ModalProvider 的 scoped slot 中取得 modal 的狀態，有 `show` 以及 `data`，我們將這兩個資料連接到 Modal 上。 並且設定初始的資料 `init-data`

```vue
<!-- Step 3: connect ModalProvider to UserModal -->
<script setup>
import { useModalContext, ModalProvider } from "vue-use-modal-context"

const { openModal } = useModalContext()
</script>
<template>
  <div>
    <ModalProvider v-slot="{ modal }" name="UserModal" :init-data="{ userId: 0 }">
      <UserModal v-model="modal.show" :user-id="modal.data.userId"  />
    </ModalProvider>
  </div>
</template>
```

最後只要加上開啟 modal 的 `button`，在上面綁定 `openModal` 即可。

```vue
<!-- Step 4: openModal anywhere -->
<script setup>
import { useModalContext, ModalProvider } from "vue-use-modal-context"

const { openModal } = useModalContext()
</script>
<template>
  <div>
    <button @click="openModal('UserModal', { userId: 81383 })">Show user</button>
    <ModalProvider v-slot="{ modal }" name="UserModal" :init-data="{ userId: 0 }">
      <UserModal v-model="modal.show" :user-id="modal.data.userId"  />
    </ModalProvider>
  </div>
</template>
```

如果你想要新增一個 modal，那只要註冊新的 modalProvider 就好。

```vue
<!-- Step ex: use more modal -->
<script setup>
import { useModalContext, ModalProvider } from "vue-use-modal-context"

const { openModal } = useModalContext()
</script>
<template>
  <div>
    <button @click="openModal('UserModal', { userId: 81383 })">Show user</button>
    <button @click="openModal('OrderModal', { orderId: 233456 })">Show order</button>
    <button @click="openModal('PaymentModal', { paymentId: 33445 })">Show payment</button>

    <ModalProvider v-slot="{ modal }" name="UserModal" :init-data="{ userId: 0 }">
      <UserModal v-model="modal.show" :user-id="modal.data.userId"  />
    </ModalProvider>
    
    <ModalProvider v-slot="{ modal }" name="OrderModal" :init-data="{ orderId: 0 }">
      <UserModal v-model="modal.show" :user-id="modal.data.orderId"  />
    </ModalProvider>
    
    <ModalProvider v-slot="{ modal }" name="PaymentModal" :init-data="{ paymentId: 0 }">
      <UserModal v-model="modal.show" :user-id="modal.data.paymentId"  />
    </ModalProvider>
  </div>
</template>
```

useModalContext 也有元件的版本，如果你偏好使用元件也可以嘗試看看。

```vue
<!-- Step ex: ModalContext component -->
<script setup>
import { ModalContext, ModalProvider } from "vue-use-modal-context"

</script>
<template>
  <ModalContext v-slot="{ openModal, closeModal }">
    <div>
      <button @click="openModal('UserModal', { userId: 81383 })">Show user</button>
      <button @click="openModal('OrderModal', { orderId: 233456 })">Show order</button>
      <button @click="openModal('PaymentModal', { paymentId: 33445 })">Show payment</button>

      <ModalProvider v-slot="{ modal }" name="UserModal" :init-data="{ userId: 0 }">
        <UserModal v-model="modal.show" :user-id="modal.data.userId"  />
      </ModalProvider>
      
      <ModalProvider v-slot="{ modal }" name="OrderModal" :init-data="{ orderId: 0 }">
        <UserModal v-model="modal.show" :user-id="modal.data.orderId"  />
      </ModalProvider>
      
      <ModalProvider v-slot="{ modal }" name="PaymentModal" :init-data="{ paymentId: 0 }">
        <UserModal v-model="modal.show" :user-id="modal.data.paymentId"  />
      </ModalProvider>
    </div>
  </ModalContext>
</template>
```


## Tutorial - global context
可能會需要一個可以跨元件，並且跨 context 的 global modal context。

這時候你可以使用 `useGlobalModalContext`。

使用 global modal 需要註冊 plugin，請參考[文件](#install)。

### setup global modal
你可以在任何一個地方設定 `<ModalProvider>`。記得，將他設定為 `global`。通常會放在 `App.vue` 

```vue
<!-- App.vue -->
<template>
  <ModalProvider name="LoginModal" global>
    <!-- Do anything just like non-global modal -->
  </ModalProvider>
</template>
```

設定好之後，就可以在任何地方使用 `useGlobalModalContext` 開啟他

```vue
<!-- Child.vue -->
<script setup>
import { useGlobalModalContext } from "vue-use-modal-context"

const { openGlobalModal, patchGlobalModal, closeGlobalModal, } = useGlobalModalContext()

onMounted(() => {
  openGlobalModal("LoginModal")
})
</script>
```

## documentation

### `useModalContext` and `<ModalContext>`
`useModalContext` 是個 composition function。會對子元件用 provide 的方式傳遞 modal context 的資料。此外他會回傳 3 個函式。

- `openModal(name: string, data?: Record<string, any>) => void`: 開啟指定 name 的 modal，並傳遞 data。傳遞 data 時會完全覆寫現有的 data。data 不是必傳的，有傳遞的話必須是個 Object，如果沒有傳，則 modal data 會是 initData。
- `closeModal(name: string) => void`: 關閉指定 name 的 modal。

- `patchModal(name: string, data: Record<string, any> | (data) => Record<string, any>) => void`:
  -  更新指定 modal 的 data。
  -  不是 overwrite，而是會以類似 `Object.assign` 的方式更新。
  -  建議 `openModal` 之後才做 `patchModal`。
  -  從 `0.3.0` 版開始， data 可以是 update function。這個函式會接收現在的 modalData，並且會將回傳的物件合併到 modalData 上

```ts
// From 0.3.0
// patch modal by function data
patchModal("UserModal" ,(currentData) => {
  return currentData.userId === 123 ? { 
    order: [
      ...currentData.order,
      newOrder
    ]
  } : {}
})
```


#### `<ModalContext>`
`<ModalContext>`是 `useModalContext` 的元件版本，是個 renderless component。這三個函式也可以在 `<ModalContext>` 元件的 scoped slot 中取得。

```html
<ModalContext v-slot="{ openModal, closeModal, patchModal}">
  <!--your content ....-->
</ModalContext>
```

你也可以透過 `ref` 在 setup 中存取 `ModalContext` 的方法。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const ModalContextRef = ref()
onMounted(() => {
  if (ModalContextRef.value){
    ModalContextRef.value.openModal('UserModal', { userId: 3310 })
    // or closeModal, patchModal ....
  }
})
</script>
<template>
  <ModalContext v-slot="{ openModal, closeModal, patchModal}" ref="ModalContextRef">
    <!--your content ....-->
  </ModalContext>
</template>
```

### `useModalProvider` and `<ModalProvider>`
`<ModalProvider>` 是 `useModalProvider` 的元件版本，是個 renderless component。他會在自己所在 ModalContext 中註冊 modal。

他必須被放在 ModalContext 之中，換句話說，他的父元件或是更上層的元件必須要有 `useModalContext` 或是 `ModalContext`。

`<ModalProvider>` 提供一些參數：
- `name`: 必要參數。設定 modal 的名稱。這會對應 openModal 的第一參數。
- `init-data`: 非必要參數。會決定 `modal.data` 的初始狀態。如果沒有傳，則預設 `{}`。
- `global`: `boolean`。是否屬於 globalModalContext ，default是false。（見 globalModalContext）
- `reset-after-close`: `boolean。是否在` close 之後 reset data 回 init-data。預設是 `false`。

`<ModalProvider>` 提供的 `scoped slot`：
- `modal`: 有 modal 的狀態跟一些函式可以用。 是一個 **reactive 物件**，所以**不要對這個物件做解構賦值**。
  - `modal.show`: `boolean`， modal 是開 or 關。
  - `modal.data`: 預設是 `{}`，如果有傳 `init-data` 的話，則預設是 `init-data`。當呼叫 `openModal` 時，如果 `openModal` 有傳遞 data，則 `modal.data` 會變成該 data。呼叫 `patchModal` 時也可以修改 `modal.data`。

- `closeAnd(fn: () => any)`: 關閉 modal ，並執行 fn。如果需要設定 event handler 時，這可以幫得上忙。

以下使用 closeAnd 的一個時機：

```html
<ModalProvider v-slot="{ modal, closeAnd }" name="UserEditModal" :init-data="{ userId: 0 }">
  <Modal v-model="modal.show">
    <UserForm :user-id="modal.data.userId" @update-sucess="closeAnd(fetchUserList)" />
  </Modal>
</ModalProvider>
```

`useModalProvider` 是個 composition function。`<ModalProvder>` 內部就是使用 `useModalProvider`。

參數：`(name: string, initData: Record<string, any> = {}, resetAfterClose: boolean = false, global: boolean = false)`

- `name`: 必要參數。設定 modal 的名稱。這會對應 `openModal` 的第一參數。
- `init-data`: 非必要參數。會決定 `modal.data` 的初始狀態。如果沒有傳，則預設 `{}`。
- `resetAfterClose`: 非必要參數。是否在 close 後重設 data 回 initData。預設是 false。
- `global`: boolean。是否屬於 globalModalContext ，default 是 `false`。（見 globalModalContext）


回傳：
- `modal`: 與 `<ModalProvider>` scoped slot 中的 `modal`。


### `useGlobalModalContext`
`useGlobalModalContext` 可以取得 global modal context 的操作函式：

`useGlobalModalContext` 將會回傳：

- `openGlobalModal`: 與 `openModal` 相同，但只能開啟 global modal。
- `closeGlobalModal`: 與 `closeModal` 相同，但只能關閉 global modal。
- `patchGlobalModal`: 與 `patchModal` 相同，但只能 patch global modal。


### Types
內部的 type 基本上都有曝露出來。以下說明比較常用的 type 設置

#### Global components type
當你是使用全域註冊元件時(比如使用 plugin 時)，如果你是使用 `vscode` + `volar`，你可以透過以下方式設置 global components type

```ts
// src/components.d.ts
import { ModalContext, ModalProvider } from 'vue-use-modal-context'

declare module 'vue' {
  export interface GlobalComponents {
    ModalContext: typeof ModalContext
    ModalProvider: typeof ModalProvider
  }
}
```