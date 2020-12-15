import { createStore } from 'vuex';
import user from './modules/user';

export default createStore({
  state: {},
  getters: {
    userInfo: state => state.user.userInfo,
  },
  mutations: {},
  actions: {},
  modules: { user },
});
