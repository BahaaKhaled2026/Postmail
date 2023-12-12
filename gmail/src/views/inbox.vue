<template>
  <section class="d-flex">
    <sideBar />
    <div v-if="messages.length!==0" class="body flex-column">
      <msgBar v-for="msg in messages" :key="msg.id" :msg="msg"/>
    </div>
    <div v-else class="body flex-column">
      <h1>No messages</h1>
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
  data() {
    return {
      messages: $store.state.currUser.inbox,
    };
  },
};
</script>

<style>
.body {
  background-color: #ebe6ef;
  width: 100%;
}
.d-flex{
  margin-top: -60px;
}
</style>