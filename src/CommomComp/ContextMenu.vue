<template>
  <div
    class="contextmenu"
    v-show="menuShow"
    :style="{ top: menuTop - 64 + 'px', left: menuLeft + 'px' }"
  >
    <ul>
      <template>
        <li @click="fullCurComponent">自动调整长度</li>
        <li @click="deleteComponent">删除选中盒子</li>
        <li @click="saveTemp">保存模板</li>
        <li @click="downloadHtml">下载到本地</li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import download from "downloadjs";
// import { htmlTostring } from "../utils/htmlTostring";
export default {
  data() {
    return {
      copyData: null,
    };
  },
  computed: mapState(["curComponent", "menuShow", "menuTop", "menuLeft"]),
  methods: {
    fullCurComponent() {
      if (!this.curComponent) {
        this.$message.error("请先选中盒子");
        return;
      }
      this.$store.commit("fullCurComponent");
    },
    deleteComponent() {
      this.$store.commit("deleteComponent");
    },
    async saveTemp() {
      await this.$store.commit("hideContextMenu");
      const tempName = window.prompt("请输入模板名称");
      await this.$store.commit("saveTemplate", tempName);
      this.$message.success("保存成功");
    },
    downloadHtml() {
      this.$store.commit("hideContextMenu");
      this.$store.commit("changeCurNode", -1);
      this.$axios
        .post("/downloadTemp", {
          data: document.body.innerHTML,
        })
        .then((res) => {
          download(res.data, "dlHTML.html", "text/html");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>