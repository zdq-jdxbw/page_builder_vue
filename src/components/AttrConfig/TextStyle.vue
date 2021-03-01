<template>
  <div>
    <a-form>
      <a-form-item
        v-for="(item, index) in styleKeys"
        :key="index"
        :label="map[item]"
        :style="{ 'margin-bottom': '0px' }"
      >
        <colorPicker
          v-if="isColorPicker(item)"
          v-model="curComponent.style[item]"
        ></colorPicker>
        <a-select
          v-else-if="item == 'textAlign'"
          default-value="center"
          @change="handleChangeTextAlign"
        >
          <a-select-option value="center"> 居中 </a-select-option>
          <a-select-option value="left"> 左开始 </a-select-option>
          <a-select-option value="right"> 右开始 </a-select-option>

          <a-select-option value="justify"> 两端对齐 </a-select-option>
        </a-select>
        <a-input v-else type="number" v-model="curComponent.style[item]" />
      </a-form-item>
      <a-form-item>
        <a-textarea :value="curComponent.propValue" @change="textChange" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getTextlStyle } from "../../utils/handleStyle";
export default {
  data() {
    return {
      map: {
        color: "字体颜色",
        fontSize: "字体大小",
        fontWeight: "字体粗细",
        lineHeight: "行高",
        textAlign: "字体对齐方式",
      },
    };
  },
  computed: {
    styleKeys() {
      return getTextlStyle();
    },
    curComponent() {
      return this.$store.state.curComponent;
    },
  },
  methods: {
    isColorPicker(value) {
      const colorItems = ["color", "backgroundColor", "borderColor"];
      return colorItems.indexOf(value) > -1;
    },
    handleChangeTextAlign(value) {
      this.$store.commit("modifyCurStyle", { styleName: "textAlign", value });
    },
    textChange(e) {
      this.$store.commit("curComTextChange", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>