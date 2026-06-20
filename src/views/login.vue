<!-- 登录页面 -->
<template>
  <div class="container">
    <div class="title">
      <div class="back-home">
        <el-icon>
          <Back />
        </el-icon>
        <span><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>请输入您的登录信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form ref="ruleformRef" :model="formData" :rules="rules" label-position="top">
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input v-model="formData.username" size="large" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password />
        </el-form-item>
        <el-button class="btn" size="large" type="primary" @click="submitForm(ruleformRef)">登录</el-button>
      </el-form>
      <div class="footer">
        <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login } from '@/api/admin'
import { useRouter } from 'vue-router'

const ruleformRef = ref()

const formData = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const router = useRouter()
const submitForm = async (forEl) => {
  if (!forEl) return
  //校验表单
  const valid = await forEl.validate()
  if (!valid) return
  try {
    const data = await login(formData)
    //判断token是否存在
    if (!data.token) {
      ElMessage.error('登录失败')
      return
    }
    //登录成功，保存token和用户信息
    localStorage.setItem('token', data.token)
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    ElMessage.success('登录成功')
    //根据用户角色确定跳转的路径
    router.push(data.userInfo.userType === 2 ? '/back/dashboard' : '/')
  } catch (error) {
    ElMessage.error(error?.message || '网络异常，请检查账号密码')
    return
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 384px;

  .title {
    .back-home {
      margin-bottom: 60px;
    }

    .title-text {
      text-align: center;

      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }

      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }

  .form-container {
    margin-top: 30px;

    .btn {
      margin-top: 40px;
      width: 100%;
    }

    .footer {
      margin-top: 40px;
      text-align: center;

      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }
}
</style>