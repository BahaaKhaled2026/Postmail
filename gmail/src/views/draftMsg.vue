<template>
  <div class="msg">
    <div class="row msgBody flex-column">
      <div class="sender d-flex justify-content-between">
        <p @click="openMessage">{{ msg.title }}</p>
        <div class="title">
          <p @click="openMessage">{{ msg.sender }}</p>
        </div>
        <div class="date">
          <p @click="openMessage">{{ msg.date }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    <h1>{{ msg.title }}</h1>
    <p>{{ sentTo }}</p>
    <p>{{ msg.date }}</p>
    <p>{{ msg.message }}</p>
  </div> -->
</template>

<script>
export default {
  props: ["msg"],
  mounted() {
    this.messages.sentToMails.map((mail) => {
      this.sentTo = this.sentTo + mail + ",";
    });
  },
  data() {
    return {
      messages: this.msg,
      sentTo: "",
    };
  },
};
</script>

<style>
* {
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
  border-radius: 5px;
}
.msgBody {
  padding: 15px;
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.date {
  text-align: right;
}
</style>