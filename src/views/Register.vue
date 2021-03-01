<template>
  <div class="login_main">
    <a-form :form="form" class="login-form" @submit="handleRegister">
      <a-form-item class="login-form-username">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Please input your Username!' },
              ],
            },
          ]"
          placeholder="Username"
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
            'account',
            {
              rules: [
                { required: true, message: 'Please input your account!' },
              ],
            },
          ]"
          placeholder="Account"
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
        <a-input
          v-decorator="[
            'comfirmPassword',
            {
              rules: [
                { required: true, message: 'Please confirm your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Confirm Password"
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
          注册
        </a-button>
        <a href="/login" class="login-form-button-a">返回登录 </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_register" });
  },
  methods: {
    handleRegister(e) {
      e.preventDefault();
      this.form
        .validateFields((err, values) => {
          if (!err) {
            this.checkForm(values).then((result) => {
              if (result.key) {
                this.$axios
                  .post("/register", {
                    data: values,
                  })
                  .then((res) => {
                    if (res) {
                      this.$message.success("注册成功");
                      this.$router.push("/login");
                    } else {
                      this.$message.error("注册失败");
                    }
                  });
              } else {
                this.$message.error(result.message);
              }
            });
          }
        })

        .catch((err) => {
          console.log(err);
        });
    },
    async checkForm(data) {
      const result = {
        key: true,
        message: "",
      };
      const { account, password, comfirmPassword } = data;
      let isExistAccount = await this.$axios.post("/checkAccountExist", {
        data: account,
      });
      if (!isExistAccount.data) {
        (result.key = false), (result.message = "账号已存在");
      } else if (password !== comfirmPassword) {
        (result.key = false), (result.message = "两次输入密码不一致");
      } else if (account.length != 11) {
        (result.key = false), (result.message = "账号长度应为11个数字");
      }
      return result;
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