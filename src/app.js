import { createApp } from 'vue'
import appVue from './app.vue'
import router from './router'
const app = createApp(appVue)
app.use(router)
app.mount('#app')