<template>
  <div class="toobar_comom">
    <div class="toobar_right">
      <div @click="routeToWorkSpace">工作台</div>
      <div @click="routerToTemp">我的模板</div>
      <div @click="routerToDoc">帮助文档</div>
    </div>
    <div class="toobar_left">
      <div class="left_first">
        <span v-if="curUsername"> {{ `你好，${curUsername}` }}</span>
      </div>

      <div class="left_second">
        <span v-if="!curUsername" @click="handleLogin">登录</span>
        <span v-else @click="handleLogout">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    curUsername() {
      return this.$store.state.curUserInfo.name
        ? this.$store.state.curUserInfo.name
        : "";
    },
  },
  methods: {
    routerToTemp() {
      this.$router.push("/template");
    },
    routerToDoc() {
      this.$router.push("/doc");
    },
    routeToWorkSpace() {
      this.$router.push("/");
    },
    handleLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      this.$store.commit("logout");
      localStorage.removeItem("page_builder_token");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.toobar_comom {
  display: flex;
  .toobar_right {
    width: 70%;
    display: flex;
    div {
      width: 17%;
      text-align: center;
      line-height: 64px;
      font-size: 22px;
    }
  }
  .toobar_left {
    width: 30%;
    display: flex;
    .left_first {
      font-size: 18px;
      width: 70%;
      text-align: center;
      line-height: 64px;
    }
    .left_second {
      width: 15%;
      font-size: 18px;
      text-align: center;
      line-height: 64px;
    }
  }
}
</style>