<template>
  <div class="all">
    <section class="d-flex window">
      <sideBar/>
      <div v-if="this.msg" class="body d-flex flex-column align-items-start">
        <h2>{{this.msg.title}}</h2>
        <div class="info d-flex flex-row justify-content-between">
          <h5>{{this.msg.sender}}</h5>
          <h5>{{this.msg.date}}</h5>
        </div>
          <p>{{this.msg.message}}</p>
        <div class="butn d-flex justify-content-evenly">
          <button v-for="attch in this.msg.attachments" :key="attch.attName" v-show="this.msg.attachments" @click="download(attch)">{{attch.attName}}</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import $store from "../store/index.js";
import sideBar from "@/components/sideBar.vue";
export default {
  props: ["id"],
  components: {
    sideBar,
  },
  data() {
    return {
      msg: {
        id: 0,
        title: "",
        sender: "",
        date: "",
        message: "",
      },
    };
  },
  methods: {
    download(attch) {
      this.downloadAttachment(attch)
    },

    async downloadAttachment(attch) {
      try {
        const binaryData = atob(attch.attachment);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          view[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], {
          type: attch.attType || "application/octet-stream",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = attch.attName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading attachment:", error);
      }
    },
  },
  created() {

      console.log($store.state.currUser)
      console.log(this.id)
      const allMessages = [].concat(
      this.$store.state.currUser.inbox,
      this.$store.state.currUser.sent,
      this.$store.state.currUser.trash,
      this.$store.state.currUser.draft
  );
      this.msg = allMessages.find(msg => msg.id == this.$route.params.id)
  },
  mounted(){
      console.log(this.msg)
      setInterval(() => {
      this.messages =
        $store.state.currUser && $store.state.currUser.inbox
          ? $store.state.currUser.inbox
          : null;
    }, 50);
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
  }
};
</script>

<style scoped>
* {
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
  padding: 20px 40px;
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
p {
  text-align: left;
  padding: 30px;
}
h2 {
  font-size: 40px;
  padding: 30px;
}
h5 {
  font-size: 20px;
}
.info {
  padding: 20px;
  width: 100%;
}
.butn button{
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #53c6ba;
}
.butn{
  padding: 40px;
  width: 100%;
}
.butn button:hover{
  background-color: #53c6ba;
  color: white;
}
</style>