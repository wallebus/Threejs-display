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
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { CreateCanvas } from "../unlits/CreateCanvs";
const scene = new Scene();

// if (document.querySelector("canvas") === null) {
const canvas = CreateCanvas();
// const canvas = document.querySelector("canvas") as HTMLElement;

const Size = {
  width: canvas.clientWidth,
  height: canvas.clientHeight,
};

const camera = new PerspectiveCamera(75, Size.width / Size.height, 0.1, 20);
// camera.position.z = 5;

const geometry = new BoxGeometry(2, 2, 2);
const material = new MeshBasicMaterial({ color: new Color("red") });
const cube = new Mesh(geometry, material);

const renderer = new WebGLRenderer({ canvas: canvas });

// 距离归一化
// console.log(cube.position.normalize());

renderer.setSize(Size.width, Size.height);
camera.position.z = 5;

// cube.quaternion.set()
scene.add(cube, camera);

renderer.render(scene, camera);
</script>

<style></style>
