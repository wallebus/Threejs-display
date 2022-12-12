<template></template>

<script lang="ts" setup>
// import {onMounted, ref} from"vue"
import {
  AxesHelper,
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { render } from "vue";
import { CreateCanvas } from "../units/CreateCanvas";
const scene = new Scene();

const canvas = CreateCanvas();

const Size = {
  width: window.innerWidth * 0.8,
  height: window.innerHeight * 0.8,
};

const camera = new PerspectiveCamera(75, Size.width / Size.height, 0.1, 20);
// camera.position.z = 5;

const geometry = new BoxGeometry(2, 2, 2);
const material = new MeshBasicMaterial({ color: new Color("red") });
const cube = new Mesh(geometry, material);
cube.rotation.set(1, 0, 1);
// cube.position.set()

const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// 距离归一化
// console.log(cube.position.normalize());
window.addEventListener("resize", () => {
  Size.width = window.innerWidth * 0.8;
  Size.height = window.innerHeight * 0.8;
  // console.log(aspect);
  // aspect = Size.width / Size.height;
  camera.aspect = Size.width / Size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(Size.width, Size.height);
});

renderer.setSize(Size.width, Size.height);

camera.position.set(0, 5, 2);
camera.lookAt(cube.position);

// const axesHelp = new AxesHelper(2);
// cube.quaternion.set()
const tick = () => {
  scene.add(cube, camera);
  // cube.rotation.y = clock.getElapsedTime();
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};
tick();

</script>

<style>

</style>
