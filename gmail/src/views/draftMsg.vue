<template>
  <div class="msg">
    <div class="row msgBody flex-column">
      <div class="sender d-flex justify-content-between">
        <p @click="goTosend(msg)">{{ msg.title }}</p>
        <div class="title">
          <p @click="goTosend(msg)">{{ sentTo }}</p>
        </div>
        <div class="date">
          <p @click="goTosend(msg)">{{ msg.date }}</p>
        </div>
        <div class="delete">
          <input type="checkbox" @click="choose" v-model="chosen" />
          <button @click="deleteMsg">delete</button>
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
import $store from "../store/index.js";
export default {
  props: ["msg"],
  mounted() {
    this.routename = this.$route.name;
    this.folderindex = parseInt(this.$route.path.replace("/folder/", ""));
    if ($store.state.selectedMsg > 0) {
      $store.state.currDraftMsg.sentToMails.map((ms, index) => {
        if ($store.state.currDraftMsg.sentToMails.length === 1) {
          this.sentto += ms;
        } else {
          if ($store.state.currDraftMsg.sentToMails.length - 1 === index) {
            this.sentto += ms;
          } else {
            this.sentto += ms + ",";
          }
        }
      });
    }
  },
  data() {
    return {
      messages: this.msg,
      sentTo: "",
      chosen:false ,
      routename: "",
      folderindex: null,
    };
  },
  methods: {
    choose() {
      if (!this.chosen) {
        console.log("choose");
        $store.commit("choose", {
          msg: this.msg,
          route: this.routename,
          index: this.folderindex,
        });
        console.log($store.state.draftmirror);
      } else {
        console.log("unchoose");
        $store.commit("unchoose", {
          msg: this.msg,
          route: this.routename,
          index: this.folderindex,
        });
        console.log($store.state.inboxmirror);
      }
    },
    goTosend(ms) {
      $store.commit("setWillBeSentId",ms.id);
      console.log(ms.id);
      localStorage.setItem("willBeSentId",ms.id);
      $store.commit("setCurrDraftMsg",ms);
      //$store.state.currDraftMsg.sentToMails = ms.sentToMails;

      $store.commit("setCurrMsg", ms);

      
      $store.commit("setHoldDraft", true);
      let x = $store.state.currDraftMsg.id;
      console.log(x);
      $store.commit("setSelectedMsg", x);
      console.log($store.state.selectedMsg);
      console.log(this.messages);
      this.$router.push({ name: "send" });
    },
    deleteMsg() {
      $store.commit("deleteMsg", this.msg);
      fetch(
        `http://localhost:8080/updateMessages/${$store.state.currUser.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify($store.state.currUser),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((userData) => {
          $store.commit("setCurrUser", userData);
          console.log(userData);
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    },
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