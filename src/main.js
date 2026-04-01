//vue应用唯一入口
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
//创建vue实例（基础容器）
const app = createApp(App)
const pinia = createPinia()
//注册图标插件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//挂载插件、全局配置
app.use(ElementPlus).use(router).use(pinia)
console.log('当前路由：', router.currentRoute.value)
console.log('所有路由：', router.getRoutes().map(r => r.path));
//挂载应用到DOM（启动应用）
app.mount('#app')
