# vue-use-modal-context
[繁體中文](./README.zh-tw.md)

This is a tool that makes using modals more convenient by using [Vue 3 `provide` / `inject`](https://vuejs.org/guide/components/provide-inject.html). Please familiarize yourself with it before use.

It provides a simpler way to toggle modals and pass data. It should reduce some of the work when configuring modals.

Supports Vue 3+.

Excludes the modal itself. If you're choosing a modal package, you might consider [vue-final-modal](https://github.com/vue-final/vue-final-modal)。

- [vue-use-modal-context](#vue-use-modal-context)
  - [Install](#install)
  - [Tutorial](#tutorial)
  - [tutorial - global context](#tutorial---global-context)
  - [documentation](#documentation)
    - [`useModalContext` and `<ModalContext>`](#usemodalcontext-and-modalcontext)
      - [`<ModalContext>`](#modalcontext)
    - [`useModalProvider` and `<ModalProvider>`](#usemodalprovider-and-modalprovider)
    - [`useModalProvider`](#usemodalprovider)
    - [`useGlobalModalContext`, `useGlobalModal`](#useglobalmodalcontext-useglobalmodal)
    - [Types](#types)
      - [Global components type](#global-components-type)
      - [slot type](#slot-type)



## Install
```sh
npm install vue-use-modal-context
```

You can globally register the component  `<ModalContext>`, `<ModalProvider>` using a plugin.

```ts
import { ModalContextPlugin } from "vue-use-modal-context"

const app = createApp(App)

app.use(ModalContextPlugin)

app.mount('#app')
```

Alternatively, you can also import it directly.

```ts
import { ModalContext, ModalProvider } from "vue-use-modal-context"
```

[setup global component type](#global-components-type)

## Tutorial 
First, let's take a look at a typical example of using a modal.

This is a situation I often encounter: to set up a modal, I need to configure show, `openModal`, `modalData`, and so on. If there are 10 modals, I have to set it up 10 times.

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

Now, let's try using the tools provided by `vue-use-modal-context`, namely `useModalContext` and `ModalProvider`, to simplify this example. First, call `useModalContext()`, and you can obtain `openModal`.

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

Next, you need to add `ModalProvider` to register a modal with the `modalContext`. We registered a modal with the name **UserModal**.

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

Next, you can retrieve the modal's state from the `scoped slot` of `ModalProvider`, which includes `show` and `data`. Connect these two pieces of data to the modal and set the initial data to `init-data`.

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

Finally, just add the button to open the modal and bind it to `openModal`.

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

If you want to add a new modal, you just need to register a new `ModalProvider`.

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

`useModalContext` also has a component version. If you prefer using components, you can give it a try as well.

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


## tutorial - global context
You might need a global modal context that spans across components and contexts. In such cases, you can use `useGlobalModalContext`.

It is recommended to use it in the top-level component (e.g., `App.vue`):

```vue
<!-- App.vue -->
<script setup>

import { useGlobalModalContext } from "vue-use-modal-context"

useGlobalModalContext()
</script>
<template>
  <Child />
  <Child2 />
</template>
```

Then, you can set `<ModalProvider`> anywhere. Remember to set it as `global`.

```vue
<!-- Child.vue -->
<template>
  <ModalProvider name="LoginModal" global>
    <!-- Do anything just like non-global modal -->
  </ModalProvider>
</template>
```

The difference is that you need to use `useGlobalModal` to obtain the methods for manipulating the modal.

```vue
<!-- Child2.vue -->
<script setup>

import { useGlobalModal } from "vue-use-modal-context"

const { openGlobalModal, patchGlobalModal, closeGlobalModal, } = useGlobalModal()

onMounted(() => {
  openGlobalModal("LoginModal")
})
</script>
```

## documentation

### `useModalContext` and `<ModalContext>`
`useModalContext` is a composition function. It uses the `provide`  to pass modal context data to child components. Additionally, it returns three functions:

- `openModal(name: string, data?: Record<string, any>) => void`: Opens the modal with the specified name and passes data. When passing data, it completely overwrites the existing data. Data is optional, but if provided, it must be an object. If not provided, the modal data will be the initial data.
- `closeModal(name: string) => void`: Closes the modal with the specified name.

- `patchModal(name: string, data: Record<string, any> | (data) => Record<string, any>) => void`:  
  - Updates the data of the specified modal. 
  - It's not an overwrite but rather an update in a way similar to `Object.assign`. 
  - It's recommended to perform patchModal after openModal.
  - From `0.3.0`, data can be a update function, it receive a current modal data, and it return value will be merged to modal data.

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
`<ModalContext>` is the component version of `useModalContext`, and it is a renderless component. These three functions can also be obtained in the `scoped slot` of the `<ModalContext>` component.

```html
<ModalContext v-slot="{ openModal, closeModal, patchModal}">
  <!--your content ....-->
</ModalContext>
```

You can use `ref` to access it methods from `setup`.

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
`<ModalProvider>` is the component version of `useModalProvider` and is a renderless component. It registers the modal within its own `ModalContext`.

It must be placed inside the `ModalContext`. In other words, its parent component or a higher-level component must have either `useModalContext` or `<ModalContext>`.

`<ModalProvider>` provides the following parameters:

- `name`: Required. Sets the name of the modal, corresponding to the first argument of openModal.
- `init-data`: Optional. Determines the initial state of `modal.data`. If not provided, it defaults to `{}`.
- `global`: `boolean`. Specifies whether it belongs to the globalModalContext. The default is `false` (see [globalModalContext](#useglobalmodalcontext-useglobalmodal)).
`reset-after-close`: `boolean`. Determines whether to reset data back to `init-data` after closing. The default is `false`.

`<ModalProvider>` provides the following `scoped slot`:

- `modal`: Contains the state of the modal and some functions. It is a `reactive` object, so **do not destructure this object**.

  - `modal.show`: boolean, indicating whether the modal is open or closed.
  - `modal.data`: Defaults to `{}`, and if `init-data` is provided, it defaults to `init-data`. When calling `openModal`, if data is passed, `modal.data` becomes that data. You can also modify `modal.data` when calling `patchModal`.
  - `closeAnd(fn: () => any)`: Closes the modal and executes `fn`. Useful when setting event handlers.

Here's an example of using `closeAnd`:

```html
<ModalProvider v-slot="{ modal, closeAnd }" name="UserEditModal" :init-data="{ userId: 0 }">
  <Modal v-model="modal.show">
    <UserForm :user-id="modal.data.userId" @update-sucess="closeAnd(fetchUserList)" />
  </Modal>
</ModalProvider>
```

### `useModalProvider`
`useModalProvider` is a composition function。`<ModalProvder>` use `useModalProvider` internally.

params:`(name: string, initData: Record<string, any> = {}, resetAfterClose: boolean = false, global: boolean = false)`

- `name`: Required. Sets the name of the modal, corresponding to the first argument of `openModal`.
- `initData`: Optional. Determines the initial state of `modal.data`. If not provided, it defaults to `{}`.
- `resetAfterClose`: `Optional`. Specifies whether to reset data back to `initData` after closing. The default is `false`.
- `global`: `boolean`. Specifies whether it belongs to the globalModalContext. The default is false (see [globalModalContext](#useglobalmodalcontext-useglobalmodal)).

Returns:
`modal`: Same as the modal in the <ModalProvider> scoped slot.


### `useGlobalModalContext`, `useGlobalModal`

`useGlobalModalContext` is similar to `useModalContext` but can register a global context. Note that components using `globalModalContext` cannot under the another `globalModalContext`. The globalModalContext won't be overridden by a regular ModalContext.

`useGlobalModal` provides the following functions to manipulate the global modal context:

`useGlobalModal` returns:

`openGlobalModal`: Similar to openModal, but can only open global modals.
`closeGlobalModal`: Similar to closeModal, but can only close global modals.
`patchGlobalModal`: Similar to patchModal, but can only patch global modals.

### Types
Most types in this package are exposed. The following explains the most commonly used type settings.

#### Global components type
When you are using globally registered components, if you are using `vscode + volar`, you can set the global components type through the following way:

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

#### slot type
Two types that might be more commonly used are `ModalProviderSlot` and `ModalContextSlot`
```vue
<script setup lang="ts">
import type { ModalContextSlot, ModalProviderSlot } from "vue-use-modal-context"

</script>

<template>
  <ModalContext v-slot="{ openModal, closeModal, patchModal}: ModalContextSlot">
    <ModalProvider v-slot="{ modal, closeAnd } : ModalProviderSlot">
      <!-- do something...-->
    </ModalProvider>
  </ModalContext>
</template>
```