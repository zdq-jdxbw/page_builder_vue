<template>
  <div class="login_main">
    <a-form :form="form" class="login-form" @submit="handleLogin">
      <a-form-item class="login-form-username">
        <a-input
          v-decorator="[
            'account',
            {
              rules: [
                { required: true, message: 'Please input your account!' },
              ],
            },
          ]"
          placeholder="account"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
        <a href="/register" class="login-form-button-a">注册 </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios
            .post("/login", {
              data: values,
            })
            .then((res) => {
              if (res.data.code == 1) {
                localStorage.setItem("page_builder_token", res.data.token);
                this.$store.commit("handleLogin", res.data.data[0]);
                this.$message.success("登录成功");
                this.$router.push("/");
              } else {
                this.$message.error("登录失败");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-form {
  height: 450px;
  width: 70%;
}
.login-form-username {
  margin-top: 100px;
}
.login-form-button-a {
  float: right;
}

.login_main {
  height: 80%;
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>