<template>
  <section class="d-flex">
    <sideBar />
    <div class="body flex-column">
      <msgBar />
      <msgBar />
      <msgBar />
    </div>
  </section>
</template>

<script>
import $store from "../store/index.js";
import msgBar from "@/components/msgBar.vue";
import sideBar from "@/components/sideBar.vue";
export default {
  components: {
    sideBar,
    msgBar,
  },
};
</script>

<style>
.body {
  background-color: #ebe6ef;
  width: 100%;
}
</style>