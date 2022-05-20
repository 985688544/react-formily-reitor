import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: { antd: true },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/products', component: '@/pages/products' }
  ],
  fastRefresh: {},
});
