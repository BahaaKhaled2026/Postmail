<template>
  <div class="msg">
    <div class="row msgBody flex-column">
      <div class="sender d-flex justify-content-between">
        <p @click="openMessage">{{ msg.title }}</p>
        <div class="actions d-flex">
          <div class="yourrate">
            <i
              class="fa-solid fa-star"
              @mousedown="mousedown(1)"
              :style="{
                color:
                  usersRate > 0 ? 'rgba(255, 0, 0, 0.582)' : 'rgb(57, 59, 60)',
              }"
            ></i>
            <i
              class="fa-solid fa-star"
              @mousedown="mousedown(2)"
              :style="{
                color:
                  usersRate > 1 ? 'rgba(255, 0, 0, 0.582)' : 'rgb(57, 59, 60)',
              }"
            ></i>
            <i
              class="fa-solid fa-star"
              @mousedown="mousedown(3)"
              :style="{
                color:
                  usersRate > 2 ? 'rgba(255, 0, 0, 0.582)' : 'rgb(57, 59, 60)',
              }"
            ></i>
            <i
              class="fa-solid fa-star"
              @mousedown="mousedown(4)"
              :style="{
                color:
                  usersRate > 3 ? 'rgba(255, 0, 0, 0.582)' : 'rgb(57, 59, 60)',
              }"
            ></i>
            <i
              class="fa-solid fa-star"
              @mousedown="mousedown(5)"
              :style="{
                color:
                  usersRate > 4 ? 'rgba(255, 0, 0, 0.582)' : 'rgb(57, 59, 60)',
              }"
            ></i>
          </div>
          <div class="trashbtn">
            <button class="button" @click="moveToTrash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 14"
                class="svgIcon bin-top"
              >
                <g clip-path="url(#clip0_35_24)">
                  <path
                    fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 57"
                class="svgIcon bin-bottom"
              >
                <g clip-path="url(#clip0_35_22)">
                  <path
                    fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="title">
        <p @click="openMessage">{{ msg.sender }}</p>
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
    return {
      rate: null,
      usersRate: this.msg.priorityLvl,
      clicked: false,
      inTrash: !$store.state.currUser.trash.includes(this.msg),
    };
  },
  props: ["msg"],
  methods: {
    openMessage() {
      this.msg.read = true;
      $store.commit("updateMsg", this.msg);
      this.$router.push({ name: "message", params: { id: this.msg.id } });
    },
    moveToTrash() {
      $store.commit("moveToTrash", this.msg);
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
    mousedown(index) {
      this.usersRate = index;
      this.clicked = true;
      this.updatepriority();
    },
    updatepriority() {
      $store.commit("updatepriority", {
        msg: this.msg,
        usersRate: this.usersRate,
      });
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
      console.log($store.currUser);
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
  border-radius: 5px ;
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
.trash {
  padding-left: 10px;
  padding-right: 10px;
}
.button {
  margin-left: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  gap: 2px;
}

.svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.svgIcon path {
  fill: white;
}

.button:hover {
  transition-duration: 0.3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
  gap: 0;
}

.bin-top {
  transform-origin: bottom right;
}
.button:hover .bin-top {
  transition-duration: 0.5s;
  transform: rotate(160deg);
}

</style>