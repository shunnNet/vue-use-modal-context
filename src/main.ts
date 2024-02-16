import { createApp } from 'vue'

import App from './App.vue'
import elementPlus from './element-plus'
import { ModalContextPlugin } from './modal'

const app = createApp(App)
app.use(elementPlus).use(ModalContextPlugin, {
  component: true,
})

app.mount('#app')
