<template>
  <div class="login-page">
    <div class="layer bg"
         id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png"
             alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm"
                   label-position="top"
                   :rules="rules"
                   :model="formLogin">
            <el-form-item prop="username">
              <el-input type="text"
                        v-model="formLogin.username"
                        placeholder="用户名">
                <i slot="prepend"
                   class="fa fa-user-circle-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password"
                        @keydown.native.enter="submit()"
                        v-model="formLogin.password"
                        placeholder="密码">
                <i slot="prepend"
                   class="fa fa-keyboard-o"></i>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="code">
              <el-input type="text"
                        v-model="formLogin.code"
                        placeholder="- - - -">
                <template slot="prepend">验证码</template>
                <template slot="append">
                  <img class="login-code"
                       src="./image/login-code.png">
                </template>
              </el-input>
            </el-form-item> -->
            <div style="height: 50px">
              <!-- 登录成功后显示动画 -->
              <lottie v-if="loginSuccessfully"
                      :options="defaultOptions"
                      :height="60"
                      :width="60"
                      @animCreated="handleAnimation" />
              <el-button v-else
                         :loading="inLogin"
                         @click="submit()"
                         type="primary"
                         class="button-login">登录</el-button>
            </div>
          </el-form>
        </el-card>
      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */
require("particles.js");
const animationData = require("@/assets/lottie/success.json");
import config from "./config/default";
import { mapActions } from "vuex";
export default {
  data: () => ({
    defaultOptions: { animationData: animationData, loop: false },
    inLogin: false,
    loginSuccessfully: false,
    // 表单
    formLogin: {
      username: "",
      password: ""
    },
    // 校验
    rules: {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
    }
  }),
  mounted() {
    // 初始化例子插件
    particlesJS("login", config);
  },
  beforeDestroy() {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    handleAnimation(animation) {
      animation.addEventListener("complete", () => {
        // 等待动画完毕
        // 登录成功 刷新到首页 重载路由和菜单
        const base = this.$router.options.base || "";
        window.location.href = `/${base}`;
      });
    },
    /**
     * @description 提交表单
     */
    // 提交登陆信息
    submit() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          return;
        }
        // 登陆
        // 注意 这里的演示没有传验证码
        // 具体需要传递的数据请自行修改代码
        this.inLogin = true;
        try {
          await this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password
          });
          this.loginSuccessfully = true;
          // 等待动画完毕
        } catch (error) {
        } finally {
          this.inLogin = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
