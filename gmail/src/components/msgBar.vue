<template>
  <div class="msg">
    <div class="row msgBody flex-column">
      <div class="sender d-flex justify-content-between">
        <p @click="openMessage">{{ msg.sender }}</p>
        <div class="icons">
          <i class="fa-regular fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i @click="moveToTrash" class="fa-solid fa-trash"></i>
        </div>
      </div>
      <div class="title">
        <p @click="openMessage">{{ msg.title }}</p>
      </div>
      <div class="date">
        <p @click="openMessage">{{ msg.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import $store from "../store/index.js";
export default {
  data() {
    return {};
  },
  props: ["msg"],
  methods: {
    openMessage() {
      this.msg.read = true;
      $store.commit("updateMsg", this.msg);
      this.$router.push({ name: "message", params: { id: this.msg.id } });
    },
    moveToTrash() {
      $store.commit("moveToTrash", this.msg.id);
      //fetch hena el user ely 3ayz a3ml update leh
      //hn3dl fe el data bta3t el user we nrg3 ngebo tany we n3ml update fe el front
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.msg {
  background-color: aliceblue;
  border-bottom: white 2px solid;
  width: 100%;
  text-align: left;
  padding: 0px 50px;
  padding-top: 10px;
}
.msgBody {
  max-height: 170px;
}
.msgBody p {
  margin: 0;
}
.msgBody .sender {
  margin-bottom: 10px;
}
.msgBody .title {
  margin-bottom: 10px;
}
.msgBody .title p {
  margin-bottom: 5px;
}

.msgBody .date {
  text-align: right;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.date {
  text-align: right;
}
</style>