<template>
  <div>
    <a-form>
      <a-form-item label="宽度" :style="{ 'margin-bottom': '0px' }">
        <a-input
          type="number"
          v-model="curComponent.style['width']"
          :disabled="isAuto"
        />
      </a-form-item>
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
        <a-input v-else type="number" v-model="curComponent.style[item]" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getNormalStyle } from "../../utils/handleStyle";
export default {
  data() {
    return {
      map: {
        height: "高",
        width: "宽",
        borderWidth: "边框宽度",
        borderColor: "边框颜色",
        opacity: "透明度",
      },
    };
  },
  computed: {
    styleKeys() {
      return getNormalStyle();
    },
    isAuto() {
      return this.$store.state.curComponent.style.width == "auto";
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
  },
};
</script>

<style lang="scss" scoped>
</style>