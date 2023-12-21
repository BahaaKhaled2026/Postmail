<template>
  <div class="all">
    <section class="d-flex window">
      <sideBar />
      <div v-if="this.msg" class="body d-flex flex-column align-items-start">
        <h2>{{ this.msg.title }}</h2>
        <div class="info d-flex flex-row justify-content-between">
          <h5>{{ this.msg.sender }}</h5>
          <h5>{{ this.msg.date }}</h5>
        </div>
        <p>{{ this.msg.message }}</p>
        <div class="d-flex justify-content-evenly">
          <button
            v-for="attch in this.msg.attachments"
            :key="attch.attName"
            v-show="this.msg.attachments"
            @click="download(attch)"
            class="download-button"
          >
            <div class="docs">
              <svg
                class="css-i6dzq1"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                stroke-width="2"
                stroke="currentColor"
                height="20"
                width="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                ></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line y2="13" x2="8" y1="13" x1="16"></line>
                <line y2="17" x2="8" y1="17" x1="16"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {{ attch.attName }}
            </div>
            <div class="download">
              <svg
                class="css-i6dzq1"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                stroke-width="2"
                stroke="currentColor"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line y2="3" x2="12" y1="15" x1="12"></line>
              </svg>
            </div>
          </button>
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
      this.downloadAttachment(attch);
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
    const userDataString = localStorage.getItem("userData");
    let em = JSON.parse(userDataString).email;
    fetch(`http://localhost:8080/getMail/${em}/${this.id}`, {
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
      .then((msgData) => {
        console.log(msgData);
        this.msg = msgData;
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  },
  mounted() {
    console.log(this.id);
    console.log(this.msg);
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
  },
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
  padding-top: 0px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 100%;
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
.butn button {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #53c6ba;
}
.butn {
  padding: 40px;
  width: 100%;
}
.butn button:hover {
  background-color: #53c6ba;
  color: white;
}
.window {
  height: 100vh;
}
.flex-column {
  height: 100vh;
}
.download-button {
  position: relative;
  border-width: 0;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 4px;
  z-index: 1;
}

.download-button .docs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 40px;
  padding: 0 10px;
  border-radius: 4px;
  z-index: 1;
  background-color: #242a35;
  border: solid 1px #e8e8e82d;
  transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}

.download-button:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.download {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  margin: 0 auto;
  z-index: -1;
  border-radius: 4px;
  transform: translateY(0%);
  background-color: #01e056;
  border: solid 1px #01e0572d;
  transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}

.download-button:hover .download {
  transform: translateY(100%);
}

.download svg polyline,
.download svg line {
  animation: docs 1s infinite;
}

@keyframes docs {
  0% {
    transform: translateY(0%);
  }

  50% {
    transform: translateY(-15%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>