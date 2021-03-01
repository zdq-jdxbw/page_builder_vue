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
        <MyUpload v-else-if="item == 'backgroundImage'" />
      </a-form-item>
      <a-form-item :label="'X位置'" :style="{ 'margin-bottom': '0px' }">
        <a-input type="number" @change="changePositionX" :value="position.x" />
      </a-form-item>
      <a-form-item :label="'Y位置'" :style="{ 'margin-bottom': '0px' }">
        <a-input type="number" @change="changePositionY" :value="position.y" />
      </a-form-item>
      <a-form-item :label="'X缩放'" :style="{ 'margin-bottom': '0px' }">
        <a-input type="number" @change="changeSizeX" :value="size.x" />
      </a-form-item>
      <a-form-item :label="'Y缩放'" :style="{ 'margin-bottom': '0px' }">
        <a-input type="number" @change="changeSizeY" :value="size.y" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getBackgroundStyle } from "../../utils/handleStyle";
import MyUpload from "../../CommomComp/MyUpload";
export default {
  components: {
    MyUpload,
  },
  data() {
    return {
      position: {
        x: 0,
        y: 0,
      },
      size: {
        x: 100,
        y: 100,
      },
      fileList: [],
      map: {
        backgroundImage: "背景图片",
        backgroundColor: "背景颜色",
        backgroundPosition: "位置",
        backgroundSize: "大小",
      },
    };
  },
  computed: {
    styleKeys() {
      return getBackgroundStyle();
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
    handlePreview() {},
    changePositionX(e) {
      const value = e.target.value;
      this.position.x = value;
      this.$store.commit("changeBGPosition", this.position);
    },
    changePositionY(e) {
      const value = e.target.value;
      this.position.y = value;
      this.$store.commit("changeBGPosition", this.position);
    },
    changeSizeX(e) {
      const value = e.target.value;
      this.size.x = value;
      this.$store.commit("changeBGSize", this.size);
    },
    changeSizeY(e) {
      const value = e.target.value;
      this.size.y = value;
      this.$store.commit("changeBGSize", this.size);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>