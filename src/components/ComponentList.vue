<template>
  <div @dragstart="handleDragstart" class="component-list">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="list"
      draggable
      :data-index="index"
    >
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import componentList from "../custom-component/component-list";
export default {
  data() {
    return {
      componentList,
    };
  },
  methods: {
    handleDragstart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;

  .list {
    width: 70%;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    padding: 2px 5px;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>