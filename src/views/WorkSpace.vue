<template>
  <div class="home_main">
    <section class="main_left">
      <component-list></component-list>
    </section>
    <section class="main_center">
      <div v-if="!isEditing" class="editing_mark">
        <div class="choose_style">
          <a-button @click="showModal" type="primary">开始编辑</a-button>
          <a-modal
            title="%模式"
            :visible="visible"
            @ok="handleOkModel1"
            @cancel="handleCancel1"
            width="300px"
            wrapClassName="first_modal"
            :closable="false"
            :style="varStyle1"
            @click="andleOkModel1()"
          >
            <template v-slot:footer>
              <a-button type="primary" @click="handleOkModel1">确定</a-button>
            </template>
            <p>盒子宽高将以%为单位,(建议使用此响应式布局方式)</p>
          </a-modal>
          <a-modal
            title="px模式"
            :visible="visible"
            @cancel="handleCancel2"
            :closable="false"
            width="300px"
            wrapClassName="seconde_modal"
            dialogClass="seconde_dailog"
            :style="varStyle2"
            @click="andleOkModel2()"
          >
            <template v-slot:footer>
              <a-button type="primary" @click="handleOkModel2">确定</a-button>
            </template>
            <p>盒子宽高将以px为单位,(初始理想区分辨路为1920x1080)</p>
          </a-modal>
        </div>
      </div>
      <Editor v-else></Editor>
    </section>
    <section class="main_right">
      <div v-if="!curComponent">请选择组件</div>
      <div v-else><set-attr></set-attr></div>
    </section>
  </div>
</template>

<script>
import Editor from "../components/Editor";
import SetAttr from "../components/AttrConfig/SetAttr";
import ComponentList from "../components/ComponentList.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      visible: false,
      varStyle1: {
        "--index1": 2001,
      },
      varStyle2: {
        "--index2": 2000,
      },
    };
  },
  components: { ComponentList, Editor, SetAttr },
  computed: mapState(["curComponent", "isEditing"]),
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel1() {
      this.varStyle2["--index2"] = this.varStyle1["--index1"] + 1;
    },
    handleCancel2() {
      this.varStyle1["--index1"] = this.varStyle2["--index2"] + 1;
    },
    handleOkModel1() {
      this.$store.commit("chooseModel", 1);
      this.visible = false;
    },
    handleOkModel2() {
      this.$store.commit("chooseModel", 2);
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
.home_main {
  height: calc(100% - 64px);
  position: relative;

  .main_left {
    position: absolute;
    height: 100%;
    width: 200px;
    left: 0;
    top: 0;
    padding-top: 10px;
  }

  .main_right {
    position: absolute;
    height: 100%;
    width: 262px;
    right: 0;
    top: 0;
  }

  .main_center {
    margin-left: 200px;
    margin-right: 262px;
    background: #f5f5f5;
    height: 100%;
    overflow: auto;
    padding: 20px;
    position: relative;
    .editing_mark {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f5f5f5;
      width: 100%;
      height: 100%;
      .choose_style {
        position: absolute;
        width: 400px;
        height: 200px;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        text-align: center;
        line-height: 200px;
      }
    }
  }
}
.home_toolbar {
  height: 64px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.first_modal {
  z-index: var(--index1);
  div:nth-child(1) {
    margin: 0 22%;
  }
}

.seconde_dailog {
  margin: 0 54%;

  div:nth-child(1) {
    margin: 0 25%;
  }
}
.seconde_modal {
  z-index: var(--index2);
}
</style>