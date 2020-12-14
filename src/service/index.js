// 用户相关接口
import axios from './axios';
// 登陆
export const login = params => axios.post(`/login`, params);
// 用户列表
export const userList = params => axios.get(`/user/list`, { params });
// 文章列表
export const articleList = params => axios.get(`/article/list`, { params });
