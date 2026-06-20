import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,//请求前缀
  timeout: 5000//请求超时时间
})

//创建请求拦截器
service.interceptors.request.use(
  (config) => {
    //在发送请求之前做些什么？
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    //请求错误做些什么？
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (response) => {
    //对响应数据做点什么
    const { data, config } = response
    //处理业务状态码
    if (data.code === '200') {
      return data.data
    }
    else if (data.code === '-1') {
      if (!config.url?.includes('/login')) {
        ElMessage.error(data.msg || '登录过期，请重新登录')
        //清除登录信息
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo') 
        // window.location.href = '/auth/login'
        return Promise.reject({ needRedirect: true, msg: data.msg })
      } else {
        ElMessage.error(data.msg || '账号或密码错误')
        return Promise.reject('data')
      }
    }
    else {
      ElMessage.error(data.msg || '请求异常')
      return Promise.reject('data')
    }
  },
  (error) => {
    //对响应错误做点什么
    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default service