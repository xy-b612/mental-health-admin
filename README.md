# AI助手 —  AI心理健康助手

> 基于 Vue 3 + 人工智能的心理健康支持平台，提供实时情绪分析、流式对话、情绪日记与知识管理，帮助用户缓解焦虑并追踪心理状态。

![Vue 3](https://img.shields.io/badge/Vue-3.4-42b883)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)
![Pinia](https://img.shields.io/badge/Pinia-2.1-ffd859)
![SSE](https://img.shields.io/badge/SSE-实时流式-00b4d8)

## ✨ 核心功能

### 👤 用户认证与权限
- 手机号 / 邮箱注册，密码加密存储
- JWT Token 持久化，自动登录
- 普通用户与管理员角色隔离路由权限

### 🤖 AI心理咨询（SSE 流式）
- 实时流式对话，打字机效果
- 基于对话内容的**情绪分析**，动态展示“情绪花园”
- 会话管理：新建 / 切换 / 删除历史会话
- 风险预警：检测到极端情绪时自动显示心理援助提示

### 📓 情绪日记
- 1～10 分情绪评分 + 8 种常见情绪标签
- 记录触发因素、睡眠质量、压力水平
- 数据可视化回顾（可选，与后台 ECharts 联动）

### 📚 知识文章
- 文章分类展示，支持 Markdown 渲染
- 后台管理：**增删改查 + WangEditor 富文本编辑**

### 📊 后台管理仪表盘
- ECharts 仪表盘：用户活跃度、情绪分布、咨询趋势
- 查看所有用户的咨询记录与情绪日志
- 知识文章统一管理

## 🛠 技术栈

- **前端框架**：Vue 3 (Composition API) + Vue Router 4 + Pinia
- **UI 组件**：Element Plus
- **构建工具**：Vite 8
- **网络请求**：Axios + `@microsoft/fetch-event-source`（SSE 流式）
- **图表库**：ECharts 6
- **富文本**：WangEditor 5
- **样式**：SCSS，响应式适配 PC / 移动端

## 🖼 项目截图

![AI聊天界面](./src/assets/images/ai-chat.png)  
![情绪日记 - 评分界面](./src/assets/images/emotion-diary.png)
![情绪日记 - 历史记录](./src/assets/images/emotion-diary2.png)
![后台数据分析](./src/assets/images/dashboard.png)
![知识文章](./src/assets/images/knowledge.png)

## 🔌 后端接口配置

本项目后端已部署在 `http://159.75.169.224:1235`，前端通过 Vite 代理转发请求。

你无需额外配置，直接运行 `npm run dev` 即可正常使用。  
若后端地址未来发生变更，请修改 `vite.config.js` 中的 `proxy.target` 为新的地址。

> 后端由课程提供，仅用于演示学习。如需自建后端，可参考项目需求文档中的 API 规范。

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/xy-b612/mental-health-admin.git

# 进入项目目录
cd mental-health-admin

# 安装依赖
npm install

# 开发环境运行
npm run dev

# 打包
npm run build