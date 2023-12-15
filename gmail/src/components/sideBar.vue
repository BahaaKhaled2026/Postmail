<template>
  <section class="flex-column">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" to="/send">
          <button class="animated-button">
            <svg
              viewBox="0 0 24 24"
              class="arr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
            <span class="text">Send</span>
            <span class="circle"></span>
            <svg
              viewBox="0 0 24 24"
              class="arr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
          </button>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" to="/inbox">
          <div class="row">
            <div class="col-3">
              <i class="fa-regular fa-envelope"></i>
            </div>
            <div class="col-6">Inbox</div>
            <div class="col-3">
              <div class="col-3">
                {{
                  $store.state.currUser && $store.state.currUser.inbox
                    ? $store.state.currUser.inbox.length
                    : 0
                }}
              </div>
            </div>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/draft">
          <div class="row">
            <div class="col-3">
              <i class="fa-solid fa-file-contract"></i>
            </div>
            <div class="col-6">Draft</div>
            <div class="col-3">
              <div class="col-3">
                {{
                  $store.state.currUser && $store.state.currUser.draft
                    ? $store.state.currUser.draft.length
                    : 0
                }}
              </div>
            </div>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/sent">
          <div class="row">
            <div class="col-3">
              <i class="fa-solid fa-envelope-open-text"></i>
            </div>
            <div class="col-6">Sent</div>
            <div class="col-3">
              <div class="col-3">
                {{
                  $store.state.currUser && $store.state.currUser.sent
                    ? $store.state.currUser.sent.length
                    : 0
                }}
              </div>
            </div>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/trash">
          <div class="row">
            <div class="col-3">
              <i class="fa-solid fa-trash"></i>
            </div>
            <div class="col-6">Trash</div>
            <div class="col-3">
              <div class="col-3">
                {{
                  $store.state.currUser && $store.state.currUser.trash
                    ? $store.state.currUser.trash.length
                    : 0
                }}
              </div>
            </div>
          </div>
        </router-link>
      </li>
      <li class="nav-item2">
        <div class="row">
          <div class="col-12">
            <div class="col-9">
              <div class="group">
                <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                    ></path>
                  </g>
                </svg>
                <input
                  placeholder="Search"
                  type="search"
                  class="input"
                  v-model="search"
                  @input="searchMsg"
                />
                <div class="col-2">
                  <select v-model="searchType">
                    <option value="title">title</option>
                    <option value="date">date</option>
                    <option value="sender">sender</option>
                    <option value="message">message</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="radiobtns">
        <div class="container">
          <form>
            <label>
              <input type="radio" name="radio" checked="" @click="sortMsgAsc" />
              <span>time asc</span>
            </label>
            <label>
              <input type="radio" name="radio" @click="sortMsgDec" />
              <span>time desc</span>
            </label>
            <label>
              <input type="radio" name="radio" @click="sortMsgPri" />
              <span>priority</span>
            </label>
          </form>
        </div>
      </li>
      <li class="nav-item2">
        <div class="row">
          <div class="col-12">
            <div class="col-12">
              <button @click="signOut" class="button type1"></button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import msgBar from "./msgBar.vue";
import $store from "../store/index.js";
export default {
  components: {
    msgBar,
  },
  data() {
    return {
      messages: {
        inbox: [],
        draft: [],
        sent: [],
        trash: [],
      },
      currUser: { inbox: [], draft: [], sent: [], trash: [] },
      search: "",
      searchType: "",
    };
  },
  mounted() {
    $store.commit("setSearch", localStorage.getItem("search"));
    this.search = $store.state.search;
    $store.commit("setSearchType", localStorage.getItem("searchType"));
    this.searchType = $store.state.searchType;
    setInterval(() => {
      if (this.$store.state.currUser && this.$store.state.currUser.inbox) {
        this.messages = { ...this.$store.state.currUser };
      } else {
        this.messages = { inbox: [], draft: [], sent: [], trash: [] };
      }
    }, 50);
  },
  methods: {
    sortMsgAsc() {
      this.$store.commit("sortMsgAsc");
      console.log($store.state.currUser.inbox);
    },
    sortMsgDec() {
      this.$store.commit("sortMsgDec");
      console.log($store.state.currUser.inbox);
    },
    sortMsgPri() {
      this.$store.commit("sortMsgPri");
      console.log($store.state.currUser.inbox);
    },
    signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      this.$store.commit("setLoginStatus", false);
      this.$store.commit("setCurrUser", null);
      this.$router.push({ name: "prehome" });
    },
    searchMsg() {
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
            $store.commit("setSearch", this.search);
            $store.commit("setSearchType", this.searchType);
            const fakeToken = "your-fake-token";
            localStorage.setItem("search", $store.state.search);
            localStorage.setItem("searchType", $store.state.searchType);
            localStorage.setItem("token", fakeToken);
            $store.commit("setCurrUser", newData);
            $store.commit("searchMsg", localStorage.getItem("search"));
          })
          .catch((error) => {
            console.error("Error during login:", error);
          });
      }
    },
  },
};
</script>
<style scoped>
.nav {
  background-color: rgb(167, 178, 194);
  padding: 10px;
  width: 220px;
  height: 634px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: -3px 0px 14px 0px #00000086;
}
.nav a {
  font-weight: 700px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.315);
}

.nav a.router-link-exact-active {
  color: black;
}
.butn {
  margin-bottom: 20px;
  background-color: rgba(255, 0, 0, 0.582);
  padding: 5px 20px;
  border: none;
  border-radius: 20px;
  color: white;
}

.nav-item2 {
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.button {
  height: 50px;
  width: 150px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.button:hover {
  box-shadow: 0.5px 0.5px 150px #252525;
}

.type1::after {
  content: "BYE :(";
  height: 50px;
  width: 150px;
  background-color: #33455b;
  color: #fff;
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translateY(50px);
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
}

.type1::before {
  content: "sign out";
  height: 50px;
  width: 150px;
  background-color: rgba(255, 0, 0, 0.582);
  color: white;
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translateY(0px) scale(1.2);
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
}

.type1:hover::after {
  transform: translateY(0) scale(1.2);
}

.type1:hover::before {
  transform: translateY(-50px) scale(0) rotate(120deg);
}
.animated-button {
  margin-left: 25px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 36px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 4px solid;
  border-color: transparent;
  font-size: 16px;
  background-color: white;
  border-radius: 100px;
  font-weight: 600;
  color: rgba(255, 0, 0, 0.582);
  box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.582);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button svg {
  position: absolute;
  width: 24px;
  fill: rgba(255, 0, 0, 0.582);
  z-index: 9;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .arr-1 {
  right: 16px;
}

.animated-button .arr-2 {
  left: -25%;
}

.animated-button .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: rgba(255, 0, 0, 0.582);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .text {
  position: relative;
  z-index: 1;
  transform: translateX(-12px);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button:hover {
  box-shadow: 0 0 0 12px transparent;
  color: #212121;
  border-radius: 12px;
}

.animated-button:hover .arr-1 {
  right: -25%;
}

.animated-button:hover .arr-2 {
  left: 16px;
}

.animated-button:hover .text {
  transform: translateX(12px);
}

.animated-button:hover svg {
  fill: #212121;
}

.animated-button:active {
  scale: 0.95;
  box-shadow: 0 0 0 4px rgba(255, 0, 0, 0.582);
}

.animated-button:hover .circle {
  width: 220px;
  height: 220px;
  opacity: 1;
}
.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 190px;
}

.input {
  width: 100%;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: 0.3s ease;
}

.input::placeholder {
  color: #9e9ea7;
}

.input:focus,
input:hover {
  outline: none;
  border-color: rgba(234, 76, 137, 0.4);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
}

.icon {
  position: absolute;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
}
.container form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.container label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
}

.container label input {
  position: absolute;
  left: -9999px;
}

.container label input:checked + span {
  background-color: rgba(255, 0, 0, 0.582);
  color: white;
}

.container label input:checked + span:before {
  box-shadow: inset 0 0 0 0.4375em rgba(247, 0, 0, 0.432);
}

.container label span {
  display: flex;
  align-items: center;
  padding: 0.375em 0.75em 0.375em 0.375em;
  border-radius: 99em;
  transition: 0.25s ease;
  color: rgba(255, 0, 0, 0.582);
}

.container label span:hover {
  background-color: #d6d6e5;
}

.container label span:before {
  display: flex;
  flex-shrink: 0;
  content: "";
  background-color: #fff;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-right: 0.375em;
  transition: 0.25s ease;
  box-shadow: inset 0 0 0 0.125em rgba(55, 0, 0, 0.582);
}
</style>