<template>
  <div class="all">
    <section class="d-flex window">
      <sideBar />
      <div v-if="hasfolders" class="body flex-column">
        <div class="addfolder">
          <button @click="showform">Add a folder</button>
          <div class="form" v-show="showf">
            <input type="text" placeholder="folder name" v-model="foldername" />
            <button @click="createfolder">create folder</button>
          </div>
        </div>
        <div
          class="test d-flex justify-content-between"
          v-for="fld in folders"
          :key="fld.foldername"
        >
          <p class="name flex-grow-1" @click="openfolder(fld)">
            {{ fld.foldername }}
          </p>
          <button @click="deletefolder(fld)">delete</button>
          <button @click="showrenameform(fld.folderindex)">Rename folder</button>
          <div class="form" v-show="showrename[fld.folderindex]">
            <input
              type="text"
              placeholder="folder name"
              v-model="newname[fld.folderindex]"
            />
            <button @click="renamefolder(fld)">rename folder</button>
          </div>
        </div>
      </div>
      <div v-else class="body flex-column">
        <h1>No Folders</h1>
        <div class="addfolder">
          <button @click="showform">Add a folder</button>
          <div class="form" v-show="showf">
            <input type="text" placeholder="folder name" v-model="foldername" />
            <button @click="createfolder">create folder</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $store from "../store/index.js";
import sideBar from "@/components/sideBar.vue";
export default {
  components: {
    sideBar,
  },
  mounted() {
    setInterval(() => {
      this.folders =
        $store.state.currUser && $store.state.currUser.folders
          ? $store.state.currUser.folders
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
          $store.commit("setSearch", localStorage.getItem("search"));
          $store.commit("setSearchType", localStorage.getItem("searchType"));
          setTimeout(() => {
            $store.commit("searchMsg", $store.state.search);
          }, 0);
          $store.commit("setCurrUser", newData);
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    }
    for (let i = 0; i < $store.state.currUser.folders.length; i++) {
        this.showrename.push(false);
        this.newname.push("");
      }
  },
  data() {
    return {
      folders: null,
      showf: false,
      foldername: "",
      newname: [],
      showrename: [],
    };
  },
  computed: {
    hasfolders() {
      return this.folders && this.folders.length > 0;
    },
  },
  methods: {
    renamefolder(fld) {
      if (this.newname === "") return;
      fld.foldername = this.newname[fld.folderindex];
      $store.commit("rename", fld);
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
    showrenameform(x) {
      this.showrename[x] = !this.showrename[x];
    },
    deletefolder(fld) {
      $store.commit("deletefolder", fld);
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
    showform() {
      this.showf = !this.showf;
    },
    createfolder() {
      for (let i = 0; i < this.folders.length; i++) {
        if (this.foldername === this.folders[i].foldername) {
          return;
        }
      }
      const newfolder = {
        messages: [],
        foldername: this.foldername,
        folderindex: this.folders.length,
      };
      console.log($store.state.currUser);
      $store.commit("createfolder", newfolder);
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
    openfolder(fld) {
      this.$router.push({ name: "folder", params: { id: fld.folderindex } });
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
.body {
  background-color: #ebe6ef;
  width: 100%;
  height: 650px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 3px 0px 14px 0px #00000086;
  overflow-y: scroll;
  overflow-x: hidden;
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
  height: 100vh;
}
.flex-column {
  height: 100vh;
}
.body > * {
  margin: 2px;
  margin-top: 5px;
}
.addfolder {
  background-color: aliceblue;
  border-bottom: white 2px solid;
  width: 100%;
  text-align: left;
  padding: 0px 50px;
  padding-top: 10px;
  border-radius: 5px;
}
</style>