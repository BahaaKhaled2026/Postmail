<template>
  <section>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link active" to="/inbox">
          <div class="row">
            
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/sent">Sent</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/draft">Draft</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/trash">Trash</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/newMessage">New Message</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/security">Security</router-link>
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
<style>
.nav {
  background-color: #9eb3b0;
  padding: 10px;
  width: 200px;
  height: 723px;
}
</style>