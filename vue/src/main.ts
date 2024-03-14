import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import RealGrid from 'realgrid'

RealGrid.setLicenseKey(import.meta.env.VITE_RG_LICENSE);

const app = createApp(App)

app.use(router)

app.mount('#app')
