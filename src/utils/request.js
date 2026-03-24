import axios from "axios";

const service = axios.create({
  baseURL:'/api',//请求前缀
  timeout:5000//请求超时时间
})

//创建请求拦截器
service.interceptors.request.use(
  (config)=>{
    //在发送请求之前做些什么？
    const token = localStorage.getItem('token')
    if(token){
      config.headers['token'] = token
    }
    return config
  },
  (error)=>{ 
    //请求错误做些什么？
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (response)=>{
    //对响应数据做点什么
    return response
  },
  (error)=>{
    //对响应错误做点什么
    return Promise.reject(error)
  }
)