import axios from 'axios';
import { message } from 'ant-design-vue';
import storage from '../utils/storage';
import qs from 'qs';
import router from '../router';
console.log(process.env, 'process.env');
axios.defaults.baseURL = process.env.VUE_APP_BASE_API; // VUE_APP_STORAGE_TOKEN
axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

axios.interceptors.request.use(
  config => {
    // 'x-www-form-urlencoded' 提交格式需要将json序列化
    if (
      config.method === 'post' &&
      config.headers.post['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1
    ) {
      config.data = qs.stringify(config.data, { allowDots: true });
    }
    if (storage.get(process.env.VUE_APP_STORAGE_TOKEN)) {
      config.headers['authorization'] = `Bearer ${storage.get(process.env.VUE_APP_STORAGE_TOKEN)}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (res) {
    if (res.data.code === 200) {
      return res.data;
    } else {
      // 无token或者token失效
      if (res.data.code === 20006) {
        router.push({
          path: '/login',
        });
        return new Promise(() => {});
      } else {
        message.error('网络错误');
        return Promise.reject(res);
      }
    }
  },
  function (error) {
    message.error('网络错误');
    return Promise.reject(error);
  },
);

export default axios;
