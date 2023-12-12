<template>
  <section>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#"
          ><lord-icon
            src="https://cdn.lordicon.com/lwumwgrp.json"
            trigger="hover"
            colors="primary:#9ce5f4,secondary:#30c9e8,tertiary:#ebe6ef"
            style="width: 70px; height: 70px"
          >
          </lord-icon
        ></a>
      </li>
      <li class="nav-item">
        <router-link to="/sent" class="nav-link"
          ><lord-icon
            src="https://cdn.lordicon.com/tmqaflqo.json"
            trigger="hover"
            style="width: 70px; height: 70px"
          >
          </lord-icon
        ></router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"
          ><lord-icon
            src="https://cdn.lordicon.com/hjbrplwk.json"
            trigger="hover"
            style="width: 70px; height: 70px"
          >
          </lord-icon
        ></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"
          ><lord-icon
            src="https://cdn.lordicon.com/jqiewnyd.json"
            trigger="hover"
            style="width: 70px; height: 70px"
          >
          </lord-icon
        ></a>
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
  background-color: #53c6ba;
  padding: 10px;
  width: 200px;
  height: 723px;
}
</style>