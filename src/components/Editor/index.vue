<template>
  <div
    :style="styleVar"
    class="center_content"
    @drop="handleDrop"
    @dragover="handleDragover"
    @click="handleClick"
    @contextmenu="showContextMenu"
  >
    <TreeNode
      v-for="item in componentData"
      :key="item.id"
      :data="item"
      :active="item === curComponent"
    ></TreeNode>
    <ContextMenu />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deepCopy } from "../../utils/deepCopy";
import generateID from "../../utils/generateID";
import componentList from "../../custom-component/component-list";
import TreeNode from "./TreeNode";
import ContextMenu from "../../CommomComp/ContextMenu";
export default {
  components: {
    TreeNode,
    ContextMenu,
  },
  computed: mapState(["componentData", "curComponent", "styleVar", "curUnit"]),
  methods: {
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const component = deepCopy(
        componentList[e.dataTransfer.getData("index")]
      );
      component.id = generateID();
      if (this.curUnit == "px") {
        component.style.width = 200;
        component.style.height = 100;
      } else {
        component.style.width = 100;
        component.style.height = 50;
      }
      this.$store.commit("addComponent", { component });
      //this.$store.commit("recordSnapshot");
    },

    handleDragover(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    handleClick(e) {
      e.stopPropagation();
      this.$store.commit("hideContextMenu");
      this.$store.commit("changeCurNode", -1);
      this.$store.commit("setCurComponent", null);
    },
    showContextMenu(e) {
      e.stopPropagation();
      e.preventDefault();
      const position = {
        x: e.clientX,
        y: e.clientY,
      };
      this.$store.commit("showContextMenu", position);
    },
  },
};
</script>

<style scoped>
.center_content {
  width: var(--width);
  height: var(--height);
  overflow: visible;
}
</style>