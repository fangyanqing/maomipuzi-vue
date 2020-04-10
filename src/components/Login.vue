<template>
  <body id="poster">
  <el-form class="login-container">
    <div class="login_box">
        <!-- 头像 -->
        <div class="avatar_box">
          <img src="../assets/login/login_tx.jpeg" alt="">
        </div>
      <!-- 表单 -->
      <el-form ref="LoginFormRef" :model="loginForm" label-width="0" :rules="LoginFormRules" class="login_form">
        <el-form-item prop="adminName">
          <el-input v-model="loginForm.adminName" prefix-icon="el-icon-user" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :type="passwordType"
                    auto-complete="off" prefix-icon="el-icon-lock" placeholder="密码">
            <i class="el-icon-view el-input__icon" :style="fontstyle" slot="suffix" @click="showPassword"></i>
          </el-input>
        </el-form-item>

        <el-form-item  prop="verifycode">
          <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
          <el-input v-model="loginForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="identifybox">
            <div @click="refreshCode">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
            <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
          </div>
        </el-form-item>

        <el-checkbox v-model="checked" class="checked">记住账号</el-checkbox>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-form>
  </body>
</template>

<script>
import SIdentify from '@/components/identify/identify.vue'
export default {
  name: 'Login',
  data () {
    // 验证码自定义验证规则
    const validateVerifycode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        adminName: '',
        password: '',
        verifycode: ''
      },
      fontstyle: {
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      checked: false,
      LoginFormRules: {
        adminName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6~20位', trigger: 'blur' }
        ],
        verifycode: [
          { required: true, trigger: 'blur', validator: validateVerifycode }
        ]
      },
      passwordType: 'password',
      responseResult: []
    }
  },
  /******************************************************************************/
  components: {
    SIdentify
  },
  mounted () {
    // 验证码初始化
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  /******************************************************************************/
  methods: {
    // 通过改变input的type使密码可见
    showPassword () {
      this.fontstyle === '' ? (this.fontstyle = 'color: #409EFF') : (this.fontstyle = '') // 改变密码可见按钮颜色
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        // eslint-disable-next-line standard/computed-property-even-spacing
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode)
    },
    resetLoginForm () {
      this.$refs.LoginFormRef.resetFields()
    },
    login () {
      this.$axios
        .post('/login2', {
          adminName: this.loginForm.adminName,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push({path: '/index'})
          } else {
            this.$message({
              message: '登录失败，请输入正确的用户名和密码',
              type: 'error'
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style >
  #poster {
    background: url("../assets/login/bg.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_box{
    width: 390px;
    height: 480px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
  .avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
  }
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .identifybox{
    display: flex;
    justify-content: space-between;
    margin-top:7px;
  }
  .btns{
    display: flex;
    justify-content: space-between;
    margin-top:11px;
    margin-right: 10px;
  }
  .el-button+.el-button {
    margin-left: 165px;
  }
  .checked{
    margin-left: -265px;
    margin-top: -20px;
  }

</style>
