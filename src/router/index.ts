import { createRouter, createWebHistory } from 'vue-router';
import mainLayout from './routes/main-layout';

const router = createRouter({
  history: createWebHistory(),
  routes: [mainLayout],
});

export default router;
