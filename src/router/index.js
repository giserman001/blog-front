import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: '文章管理',
    icon: 'MenuUnfoldOutlined',
    redirect: '/login',
    component: () => import('@/components/Layout'),
    children: [
      {
        path: '/list',
        name: '管理',
        component: () => import('@/views/home/index'),
      },
      {
        path: '/create',
        name: '创建',
        component: () => import('@/views/home/create'),
      },
    ],
  },
  {
    path: '/user',
    name: '用户管理',
    icon: 'UserOutlined',
    component: () => import('@/components/Layout'),
    children: [
      {
        path: '/user/list',
        name: '用户管理',
        icon: 'UserOutlined',
        component: () => import('@/views/order/myOrder'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    hiden: true, // 不在菜单中显示
    component: () => import('../views/login'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
