<template>
  <div class="attr-list">
    <a-form>
      <a-form-item :label="'链接'" :style="{ 'margin-bottom': '0px' }">
        <a-input
          :value="curComponent.link"
          @change="handleLinkChange"
        ></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getFlexStyle } from "../../utils/handleStyle";
export default {
  computed: {
    styleKeys() {
      return getFlexStyle();
    },
    curComponent() {
      return this.$store.state.curComponent;
    },
  },
  methods: {
    handleLinkChange(e) {
      const value = e.target.value;
      this.$store.commit("linkChange", value);
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