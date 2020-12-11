<template>
  <router-view />
</template>
<script>
import { onMounted } from 'vue';
import { notification } from 'ant-design-vue';

export default {
  setup() {
    onMounted(() => {
      if (process.env.VUE_APP_ENV !== 'production') {
        notification.open({
          message: '当前环境提示',
          duration: null,
          description: (
            <div>
              <p>{`当前环境: ${process.env.VUE_APP_ENV}`}</p>
              <p>{`接口地址: ${process.env.VUE_APP_BASE_API}`}</p>
            </div>
          ),
          placement: 'bottomRight',
          icon: <SmileOutlined style="color: #108ee9" />,
        });
      }
    });
  },
};
</script>
<style lang="scss">
@import './index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
