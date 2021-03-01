<template>
  <div class="upload">
    <div class="upload-container">
      <label class="upload-icon" for="upload-file">
        <a-icon type="plus" />
      </label>
      <input
        class="upload-input"
        id="upload-file"
        type="file"
        accept="image/*"
        @change="tirggerFile($event)"
      />
      <div v-if="imgSrc" class="upload-img">
        <img :src="imgSrc" />
        <div class="mask">
          <a-icon type="delete" @click="deleteImgSrc" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgFile: [],
      imgSrc: "",
    };
  },
  methods: {
    tirggerFile(evnet) {
      this.imgFile = evnet.target.files;
      //创建reader对象
      let reader = new FileReader();
      //传入文件 （参数必须是blob对象）
      reader.readAsDataURL(this.imgFile[0]);
      //加载完成
      reader.onloadend = () => {
        // url = reader
        this.$store.commit("setCurBGImage", reader.result);
        this.imgSrc = reader.result;
      };
    },
    deleteImgSrc() {
      (this.imgFile = []), (this.imgSrc = "");
    },
  },
};
</script>
<style lang="scss" scoped>
.upload {
  margin-bottom: 10px;
  .upload-container {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border: 1px dashed;
    border-radius: 5px;
    color: #999;
    cursor: pointer;
    z-index: 1;
    &:hover,
    &:active {
      color: #3576ff;
    }
    .upload-icon {
      display: block;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .upload-input {
      display: none;
    }
    .upload-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
      &:hover {
        .mask {
          opacity: 1;
        }
      }
    }
  }
}
</style>