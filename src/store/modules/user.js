import * as Types from '../action-types';
import * as Service from '../../service/index';
import storage from '@/utils/storage';

const state = {
  userInfo: {},
};

export default {
  namespaced: true,
  state,
  mutations: {
    [Types.LOGIN](state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    async [Types.LOGIN]({ commit }, payload) {
      let { data } = await Service.login(payload);
      commit(Types.LOGIN, data);
      if (data.token) {
        storage.set(process.env.VUE_APP_STORAGE_TOKEN, data.token);
      }
    },
    async [Types.USERINFO]({ commit }) {
      let { data } = await Service.userinfo();
      commit(Types.LOGIN, data);
    },
  },
};
