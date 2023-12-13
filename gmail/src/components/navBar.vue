<template>
  <section class="d-flex">
    <input type="text" placeholder="search" />
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  max-height: 35px;
  text-align: left;
  margin-left: -1px;
  width: 100%;
  justify-content: left;
}
input {
  margin-right: 5px;
  display: block;
  padding: 2px 1px;
  width: 50%;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid #ddd;
  transition: all 0.1s ease-in;
  color: black;
}
</style>