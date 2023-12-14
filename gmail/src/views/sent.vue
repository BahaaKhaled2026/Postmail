<template>
  <div class="all">
    <section class="d-flex window">
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
    this.messages = $store.state.currUser.sent;
  },
   updated() {
    this.messages = $store.state.currUser.sent;
  },
  data() {
    return {
      messages: {},
    };
  },
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  background-color: #ebe6ef;
  width: 100%;
  height: 635px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 3px 0px 14px 0px #00000086;
  overflow-y: scroll;

}
.all {
  height: 100%;
  background-color: rgb(203, 220, 247);
}
.window {
  padding-top: 30px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 80%;
  margin: auto;
  border-radius: 50px;
  height: 700px;
}
</style>