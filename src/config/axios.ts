import axios from "axios";
import history from './history';

const appID = "tC7J5CxEUjZtjNKiRommKHbg"
const appSecret ="7V1P6bQbWbDWrXTzJiAPTkm8"

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config:any) {
  // 在发送请求之前做些什么
  const xToken = localStorage.getItem('x-token')
  if(xToken){
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error:any) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response:any) {
  // 对响应数据做点什么
  if(response.headers['x-token']){
    localStorage.setItem('x-token',response.headers['x-token'])
  }

  return response;
}, function (error:any) {
  // 对响应错误做点什么
  if(error.response.status === 401){
    history.push('/login')
  }
  return Promise.reject(error);
});

export default instance