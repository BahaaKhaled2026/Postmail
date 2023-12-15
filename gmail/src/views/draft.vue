<template>
  <div class="all">
    <section class="d-flex window">
      <sideBar />
      <div v-if="messages.length !== 0" class="body flex-column">
        <draftMsg @click="goTosend(msg)" v-for="msg in messages" :key="msg.id" :msg="msg" />
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
import draftMsg from "./draftMsg.vue";

export default {
  components: {
    sideBar,
    msgBar,
    draftMsg,
  },
  mounted() {
    setInterval(() => {
      this.messages =
        $store.state.currUser && $store.state.currUser.draft ? $store.state.currUser.draft : [];
    }, 100);
    const userDataString = localStorage.getItem("userData");
          if (!userDataString) {
            $store.commit("setLoginStatus", false);
            $store.commit("setCurrUser", null);
          } else {
            $store.commit("setLoginStatus", true);
            let em = JSON.parse(userDataString).email;
            let newData;
            fetch(`http://localhost:8080/users/${em}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
              })
              .then((userData) => {
                console.log(userData);
                newData = userData;
                $store.commit("setCurrUser", newData);
              })
              .catch((error) => {
                console.error("Error during login:", error);
              });
          }
  },
  methods: {
    goTosend(ms){
      console.log(ms);
      $store.state.currDraftMsg.sentToMails=ms.sentToMails;
      
      $store.commit("setCurrMsg",ms);

      this.$router.push({ name: "send" });
      $store.commit("setHoldDraft",true);
      let x=$store.state.currDraftMsg.id
      console.log(x);
      $store.commit("setSelectedMsg",x)
      console.log($store.state.selectedMsg);
      console.log(this.messages);
    }
  },
  data() {
    return {
      messages: [],
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
.body > *{
  margin : 2px ;
  margin-top: 5px;
}
</style>