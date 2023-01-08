import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView,
    },
    {
      path: "/animation",
      name: "animation",
      component: () => import("../views/hide/Animation.vue"),
    },
    {
      path: "/camera",
      name: "camera",
      component: () => import("../views/Camera.vue"),
    },

    {
      path: "/geometry",
      name: "geometry",
      component: () => import("../views/Geometry.vue"),
    },
    {
      path: "/datGui",
      name: "datGui",
      component: () => import("../views/DatGui.vue"),
    },
    {
      path: "/texture",
      name: "texture",
      component: () => import("../views/hide/Texture.vue"),
    },

    {
      path: "/door",
      name: "door",
      component: () => import("../views/DoorMap.vue"),
    },
    {
      path: "/shadow",
      name: "shadow",
      component: () => import("../views/Shadow.vue"),
    },
    {
      path: "/jump",
      name: "jump",
      component: () => import("../views/hide/JumpShare.vue"),
    },
    {
      path: "/house",
      name: "house",
      component: () => import("../views/SpookHouse.vue"),
    },
    {
      path: "/point",
      name: "point",
      component: () => import("../views/PointGeo.vue"),
    },
  ],
});

export default router;
