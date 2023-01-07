<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { toggleDark } from "./units/Dark"
// import { canvas } from "./components/canvas.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/camera">Camera</RouterLink>
        <RouterLink to="/geometry">Geometry</RouterLink>
        <RouterLink to="/datGui">GUI</RouterLink>
        <RouterLink to="/door">Door</RouterLink>
        <RouterLink to="/shadow">Shadow</RouterLink>
        <RouterLink to="/house">House</RouterLink>
        <RouterLink to="/point">Point</RouterLink>
      </nav>
    </div>

    <!-- <button @click="toggleDark()">dark</button> -->
  </header>
  <Router-view />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 5px;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  margin: 0 5px;
}
</style>
