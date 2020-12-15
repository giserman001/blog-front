// 用户相关接口
import axios from './axios';
// 登陆
export const login = params => axios.post(`/login`, params);
// 获取用户信息
export const userinfo = () => axios.get(`/user/info`);
// 用户列表
export const userList = params => axios.get(`/user/list`, { params });
// 文章列表
export const articleList = params => axios.get(`/article/list`, { params });
// 标签
export const getTags = () => axios.get(`/tag/list`);
// 分类
export const getCategories = () => axios.get(`/category/list`);
