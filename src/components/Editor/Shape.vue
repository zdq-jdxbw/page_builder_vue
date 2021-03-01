<template>
  <div class="shape">
    <div
      class="shape-point"
      v-for="(item, index) in active ? pointList : []"
      :key="index"
      :style="getPointPosition(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    defaultStyle: {
      require: true,
      type: Object,
    },
  },
  data() {
    return {
      pointList: ["t", "r", "b", "l"], // 四个方向
      initialAngle: {
        // 每个点对应的初始角度
        t: 45,
        r: 135,
        b: 225,
        l: 315,
      },
    };
  },
  computed: {
    ...mapState(["curComponent"]),
    curUnit() {
      return this.$store.state.curUnit;
    },
  },
  methods: {
    getPointPosition(value) {
      const position = {};
      switch (value) {
        case "t":
          position.top = "-6px";
          position.left = "50%";
          position.cursor = "n-resize";
          break;
        case "r":
          position.top = "50%";
          position.right = "-6px";
          position.cursor = "e-resize";
          break;
        case "b":
          position.bottom = "-6px";
          position.left = "50%";
          position.cursor = "s-resize";
          break;
        case "l":
          position.top = "50%";
          position.left = "-6px";
          position.cursor = "w-resize";
          break;
        default:
          break;
      }
      return position;
    },
    handleMouseDownOnPoint(value, e) {
      e.preventDefault();
      e.stopPropagation();

      let parentWidth = e.path[3].clientWidth;
      let parentHeight = e.path[3].clientHeight;
      let preX = e.screenX;
      let preY = e.screenY;
      let preWidth = this.curComponent.style.width;
      let preHight = this.curComponent.style.height;
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const move = (moveEvent) => {
        let changeY = preHight;
        let changeX = preWidth;
        if (this.curUnit != "%") {
          if (value === "b") {
            changeY += moveEvent.screenY - preY;
          } else if (value === "r") {
            changeX += moveEvent.screenX - preX;
          } else if (value === "l") {
            changeX += preX - moveEvent.screenX;
          } else if (value === "t") {
            changeY += preY - moveEvent.screenY;
          }
        } else {
          if (value === "b") {
            changeY += Math.floor(
              ((moveEvent.screenY - preY) / parentHeight) * 100
            );
          } else if (value === "r") {
            changeX += Math.floor(
              ((moveEvent.screenX - preX) / parentWidth) * 100
            );
          } else if (value === "l") {
            changeX += Math.floor(
              ((preX - moveEvent.screenX) / parentWidth) * 100
            );
          } else if (value === "t") {
            changeY += Math.floor(
              ((preY - moveEvent.screenY) / parentHeight) * 100
            );
          }
        }
        this.$store.commit("setCurCompShape", { changeX, changeY });
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
  },
};
</script>


<style scoped>
.shape {
  width: 100%;
  height: 100%;
  position: absolute;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 999;
}
</style>