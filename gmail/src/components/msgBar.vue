<template>
  <div @click="openMessage" class="msg">
    <div class="row">
      <div class="col-3"><p>{{msg.date}}</p></div>
      <div class="col-6"><p>{{msg.title}}</p></div>
      <div class="col-3"><p>{{msg.sender}}</p></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["msg"],
  methods: {
    openMessage() {
      this.$router.push({ name: "message", params: { id: this.msg.id } });
    },
  },
};
</script>

<style>
.msg {
  background-color: #53c6ba65;
  border-bottom: white 2px solid;
  width: 100%;
  text-align: left;
}
</style>