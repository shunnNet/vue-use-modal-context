import { createApp } from 'vue'

import App from './App.vue'
import elementPlus from './element-plus'
import { ModalPlugin } from './modal'

const app = createApp(App)
app.use(elementPlus).use(ModalPlugin)

app.mount('#app')
