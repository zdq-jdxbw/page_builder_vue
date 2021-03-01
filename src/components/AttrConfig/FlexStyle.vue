<template>
  <div class="attr-list">
    <a-form>
      <a-form-item
        v-for="(item, index) in styleKeys"
        :key="index"
        :label="map[item]"
        :style="{ 'margin-bottom': '0px' }"
      >
        <a-select
          v-if="item == 'flexDirection'"
          default-value="row"
          @change="handleChangeFlexDirection"
        >
          <a-select-option value="row"> 横向 </a-select-option>
          <a-select-option value="column"> 纵向 </a-select-option>
          <a-select-option value="row-reverse"> 反横向 </a-select-option>
          <a-select-option value="column-reverse"> 反纵向 </a-select-option>
        </a-select>
        <a-select
          v-else-if="item == 'flexWrap'"
          default-value="wrap"
          @change="handleChangeFlexWrap"
        >
          <a-select-option value="wrap"> 行满换行 </a-select-option>
          <a-select-option value="nowrap"> 行满不换行 </a-select-option>
          <a-select-option value="wrap-reverse"> 行满反向换行 </a-select-option>
        </a-select>
        <a-select
          v-else-if="item == 'justifyContent'"
          default-value="flex-start"
          @change="handleChangeJustifyContent"
        >
          <a-select-option value="flex-start"> 顺序排列 </a-select-option>
          <a-select-option value="flex-end"> 反序排列 </a-select-option>
          <a-select-option value="center"> 居中排列 </a-select-option>
          <a-select-option value="space-between"> 均匀靠边 </a-select-option>
          <a-select-option value="space-around"> 均匀靠中 </a-select-option>
        </a-select>
        <a-select
          v-else-if="item == 'alignItems'"
          default-value="flex-start"
          @change="handleChangeAlignItems"
        >
          <a-select-option value="stretch"> 拉伸排列 </a-select-option>
          <a-select-option value="center"> 剧中排列 </a-select-option>
          <a-select-option value="flex-start"> 顺序排列 </a-select-option>
          <a-select-option value="flex-end"> 反序排列 </a-select-option>
          <a-select-option value="baseline"> 基线对齐 </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getFlexStyle } from "../../utils/handleStyle";
export default {
  data() {
    return {
      map: {
        flexDirection: "主轴",
        flexWrap: "换行方式",
        justifyContent: "主轴排列方式",
        alignItems: "侧轴排列方式",
      },
    };
  },
  computed: {
    styleKeys() {
      return getFlexStyle();
    },
    curComponent() {
      return this.$store.state.curComponent;
    },
  },
  methods: {
    handleChangeFlexDirection(value) {
      this.$store.commit("modifyCurStyle", {
        styleName: "flexDirection",
        value,
      });
    },
    handleChangeFlexWrap(value) {
      this.$store.commit("modifyCurStyle", { styleName: "flexWrap", value });
    },
    handleChangeJustifyContent(value) {
      this.$store.commit("modifyCurStyle", {
        styleName: "justifyContent",
        value,
      });
    },
    handleChangeAlignItems(value) {
      this.$store.commit("modifyCurStyle", { styleName: "alignItems", value });
    },
  },
};
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>