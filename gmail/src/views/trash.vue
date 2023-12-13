<template>
  <div class="all">
    <section class="d-flex">
      <sideBar />
      <div v-if="messages.length !== 0" class="body flex-column">
        <navBar />
        <msgBar v-for="msg in messages" :key="msg.id" :msg="msg" />
      </div>
      <div v-else class="body flex-column">
        <h1>No messages</h1>
      </div>
    </section>
  </div>
</template>

<script>
import $store from "../store/index.js";
import msgBar from "@/components/msgBar.vue";
import sideBar from "@/components/sideBar.vue";
import navBar from "@/components/navBar.vue";
export default {
  components: {
    sideBar,
    msgBar,
    navBar,
  },
  mounted() {
    this.messages = $store.state.currUser.trash;
  },
  data() {
    return {
      messages: {},
    };
  },
};
</script>

<style scoped>
.body {
  background-color: #ebe6ef;
  width: 100%;
}
.all {
  position: relative;
  top: 50px;
  width: 88%;
  margin: auto;
  height: 700px;
}
</style>