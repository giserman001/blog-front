import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import loadAntdCom from './utils/loadAntdCom';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
// 进度条开始
router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})
// 进度条结束
router.afterEach(() => {
  NProgress.done()
})

const app = createApp(App)
  .use(store)
  .use(router);
loadAntdCom(app);
app.mount('#app');

window.onerror = err => {
  console.log(err);
};
