<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import { canvas } from "./components/canvas.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/basic">Basic</RouterLink>
        <RouterLink to="/transform">Transform</RouterLink>
        <RouterLink to="/animation">Animation</RouterLink>
        <RouterLink to="/camera">Camera</RouterLink>
        <!-- <RouterLink to="/test">test</RouterLink> -->
        <RouterLink to="/geometry">Geometry</RouterLink>
        <RouterLink to="/datGui">GUI</RouterLink>
        <RouterLink to="/texture">Texture</RouterLink>

      </nav>
    </div>
  </header>
  <Router-view v-slot="{ Component }">
    <Keep-Alive>
      <component :is="Component" />
    </Keep-Alive>
  </Router-view>
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
