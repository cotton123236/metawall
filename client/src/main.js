import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/router'

// App
import App from './App.vue'


const app = createApp(App)

app
  .use(VueAxios, axios)
  .use(router)
  .provide('axios', app.config.globalProperties.axios)

app.mount('#app')
