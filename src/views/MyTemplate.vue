<template>
  <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta description="点击载入模板到理想区">
        <a slot="title" @click="loadTemp(item.content)">{{ item.tempName }}</a>
        <a slot="avatar" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
export default {
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      if (!vm.$store.state.curUserInfo.id) vm.$router.push("/login");
    });
  },
  data() {
    return {
      data: [],
    };
  },
  computed: {
    curUserId() {
      return this.$store.state.curUserInfo.id;
    },
  },
  mounted() {
    this.$axios
      .get(`/getTempsById/${this.curUserId}`)
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async loadTemp(value) {
      const content = JSON.parse(value);
      await this.$store.commit("loadTemp", content);
      this.$router.push("/");
    },
  },
};
</script>
<style></style>