<template>
  <div class="all">
    <section class="d-flex window">
      <sideBar />
      <div class="body flex-column">

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
  mounted(){    
  },

  data() {
    return {
    };
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
  overflow-x: scroll;
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
  
  
}
.body > * {
  margin: 2px;
  margin-top: 5px;
}
.window{
  height: 100vh;
}
.flex-column{
  height: 100vh;
}
</style>