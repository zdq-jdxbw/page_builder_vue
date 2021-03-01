<template>
  <div class="attr-list">
    <a-tabs default-active-key="1" :size="'small'" :tabBarGutter="0">
      <a-tab-pane key="1" tab="基本属性">
        <NormalStyle />
      </a-tab-pane>
      <a-tab-pane v-if="curComponent.type == 'textBox'" key="2" tab="文字属性">
        <TextStyle />
      </a-tab-pane>
      <a-tab-pane key="3" tab="背景属性">
        <BackgroundStyle />
      </a-tab-pane>
      <a-tab-pane
        key="4"
        tab="子盒子布局"
        v-if="curComponent.type == 'normalBox'"
      >
        <FlexStyle />
      </a-tab-pane>
      <a-tab-pane key="5" tab="链接">
        <LinkConfig />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import NormalStyle from "./NormalStyle";
import BackgroundStyle from "./BackgroundStyle";
import FlexStyle from "./FlexStyle";
import TextStyle from "./TextStyle";
import LinkConfig from "./LinkConfig";
import { mapState } from "vuex";
export default {
  components: {
    NormalStyle,
    BackgroundStyle,
    FlexStyle,
    TextStyle,
    LinkConfig,
  },
  computed: mapState(["curComponent"]),
};
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 10px;
  padding-top: 0;

  height: 100%;
}
</style>