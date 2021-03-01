<template>
  <div class="home">
    <div class="home_toolbar">
      <Toobar />
    </div>
    <router-view />
  </div>
</template>

<script>
import Toobar from "../components/Toobar";
import { mapState } from "vuex";

export default {
  components: { Toobar },
  computed: mapState(["curComponent"]),
};
</script>

<style lang="scss">
.home {
  height: 100vh;
  background: #fff;
  .home_toolbar {
    height: 64px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
}
</style>