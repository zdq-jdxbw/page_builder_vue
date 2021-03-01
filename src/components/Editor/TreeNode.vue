<template>
  <div
    v-if="!data.link"
    :style="myStyle"
    @click="handleClick"
    :class="active ? 'actived' : ''"
  >
    <Shape v-if="active" :defaultStyle="data.style" :active="active"></Shape>
    <span v-if="data.propValue">{{ data.propValue }}</span>
    <TreeNode
      v-for="d in data.children"
      :key="d.id"
      :data="d"
      :active="d === curComponent"
    ></TreeNode>
  </div>
  <a
    v-else
    :myhref="data.link"
    :style="myStyle"
    @click="handleClick"
    :class="active ? 'actived' : ''"
  >
    <Shape v-if="active" :defaultStyle="data.style" :active="active"></Shape>
    <span v-if="data.propValue">{{ data.propValue }}</span>
    <TreeNode
      v-for="d in data.children"
      :key="d.id"
      :data="d"
      :active="d === curComponent"
    ></TreeNode>
  </a>
</template>

<script>
import { mapState } from "vuex";
import { compRealStyle, compRealStyleOfpx } from "../../utils/handleStyle";
import Shape from "./Shape";

export default {
  name: "TreeNode",
  components: {
    Shape,
  },
  computed: {
    myStyle() {
      return this.$store.state.curUnit == "px"
        ? compRealStyleOfpx(this.data.style)
        : compRealStyle(this.data.style);
    },
    ...mapState(["curComponent"]),
  },
  props: {
    data: {
      type: Object,
      require: true,
    },
    active: {
      type: Boolean,
      require: true,
    },
  },
  created() {
    if (this.data.propValue) {
      this.data.children = [];
    }
  },

  methods: {
    handleClick(e) {
      e.stopPropagation();
      this.$store.commit("hideContextMenu");
      this.$store.commit("changeCurNode", this.data.id);
      this.$store.commit("setCurComponent", this.data);
    },
  },
};
</script>

<style>
.actived {
  outline: 1px solid #70c0ff;
  user-select: none;
}
</style>