<template>
  <section>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" to="/sent">
          <button class="butn">+ Send</button>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" to="/inbox">
          <div class="row">
            <div class="col-3">
              <i class="fa-regular fa-envelope"></i>
            </div>
            <div class="col-6">inbox</div>
            <div class="col-3">
              {{ $store.state.inbox.length }}
            </div>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/draft">
          <div class="row">
            <div class="col-3">
              <i class="fa-solid fa-envelope-open-text"></i>
            </div>
            <div class="col-6">draft</div>
            <div class="col-3">
              {{ $store.state.draft.length }}
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
            <div class="col-6">trash</div>
            <div class="col-3">
              {{ $store.state.trash.length }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import msgBar from "./msgBar.vue";
export default {
  components: {
    msgBar,
  },
};
</script>
<style scoped>
.nav {
  background-color: rgb(167, 178, 194);
  padding: 10px;
  width: 180px;
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
</style>