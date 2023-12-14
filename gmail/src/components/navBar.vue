<template>
  <section class="d-flex">
    <input type="text" placeholder="search" />
    <button @click="sortMsg">sort</button>
  </section>
</template>

<script>
import $store from "../store/index.js";
export default {
  methods: {
    sortMsg() {
      this.$store.commit("sortMsg");
      console.log($store.state.currUser.inbox);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  max-height: 35px;
  text-align: left;
  margin-left: -1px;
  width: 100%;
  justify-content: left;
}
input {
  margin-right: 5px;
  display: block;
  padding: 2px 1px;
  width: 50%;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #ddd;
  transition: all 0.1s ease-in;
  color: black;
}
</style>