import formRouter from './form';
import urlRouter from './url';

const mainLayout = {
  name: '',
  path: '/',
  redirect: '/form',
  component: () => import('@/layout/main-layout.vue'),
  children: [formRouter, urlRouter],
};

export default mainLayout;
