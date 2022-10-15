<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import { canvas } from "./components/canvas.vue";
</script>

<template>
  <!-- <canvas /> -->
  <header>
    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/basic">basic</RouterLink>
        <RouterLink to="/transform">transform</RouterLink>
        <RouterLink to="/animation">animation</RouterLink>
        <RouterLink to="/camera">camera</RouterLink>
        <!-- <RouterLink to="/test">test</RouterLink> -->
        <RouterLink to="/geometry">geometry</RouterLink>
        <RouterLink to="/datGui">gui</RouterLink>
        <RouterLink to="/texture">texture</RouterLink>

      </nav>
    </div>
  </header>
  <KeepAlive>
    <RouterView />
  </KeepAlive>
</template>

<style scoped>
nav {
  margin: 10px 0;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  margin: 0 5px;
}
</style>
