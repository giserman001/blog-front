<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="align-c mb-40">后台管理系统</h2>
      <a-form :model="form" :rules="rules" ref="ruleFormRef" :wrapper-col="{ span: 24 }">
        <a-form-item name="account" class="mb-30">
          <a-input v-model:value="form.account" placeholder="请输入账号" size="large" />
        </a-form-item>
        <a-form-item name="password" class="mt-25">
          <a-input
            v-model:value="form.password"
            placeholder="请输入密码"
            type="password"
            size="large"
          ></a-input>
        </a-form-item>
      </a-form>
      <a-button type="primary" class="login-btn" @click="loginAction" size="large">登 录</a-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as Types from '@/store/action-types';
export default {
  // setup(props, context)
  setup() {
    const data = reactive({
      form: {
        account: 'liuya',
        password: '123456',
      },
    });
    const ruleFormRef = ref('');
    const router = useRouter();
    const store = useStore();
    async function loginAction() {
      await ruleFormRef.value.validate();
      const res = await store.dispatch(`user/${Types.LOGIN}`, data.form);
      console.log(res, 'res');
      router.push('/index');
    }
    return {
      ...toRefs(data),
      ruleFormRef,
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      },
      loginAction,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 400px;
  height: 100vh;
  margin: auto;
  overflow: hidden;
  .login-container {
    padding: 0 20px;
    margin-top: 15vh;
    .login-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
