import router from './router';
import store from './store';
import * as Types from './store/action-types';
import { message } from 'ant-design-vue';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import storage from '@/utils/storage'; // get token from storage

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 确定用户是否已经登录
  const hasToken = storage.get(process.env.VUE_APP_STORAGE_TOKEN);
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.userInfo;
      if (JSON.stringify(hasGetUserInfo) !== '{}') {
        next();
      } else {
        try {
          // 获取用户信息
          await store.dispatch(`user/${Types.USERINFO}`);
          next();
        } catch (error) {
          // 删除token，转到登录页面重新登录
          storage.remove(process.env.VUE_APP_STORAGE_TOKEN);
          message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接登录
      next();
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
