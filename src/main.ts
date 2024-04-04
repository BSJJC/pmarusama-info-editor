import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';

import './css/index.css';
import './css/style.css';

const app = createApp(App);
const pinia = createPinia();

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(pinia);
app.mount('#app');
