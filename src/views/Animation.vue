<template></template>

<script lang="ts" setup>
// import {onMounted, ref} from"vue"
import {
  AxesHelper,
  BoxGeometry,
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { CreateCanvas } from "../units/CreateCanvas";
import gsap from "gsap";
const scene = new Scene();

// if (document.querySelector("canvas") === null) {
const canvas = CreateCanvas();
// const canvas = document.querySelector("canvas") as HTMLElement;

const Size = {
  width: window.innerWidth * 0.8,
  height: window.innerHeight * 0.8,
};

const camera = new PerspectiveCamera(75, Size.width / Size.height, 0.1, 20);
// camera.position.z = 5;

const geometry = new BoxGeometry(2, 2, 2);
const material = new MeshBasicMaterial({ color: new Color("red") });
const cube = new Mesh(geometry, material);

const renderer = new WebGLRenderer({ canvas: canvas });

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))

});

renderer.setSize(Size.width, Size.height);
camera.position.z = 5;

// AxesHelper(length:number)
// const axesHelper = new AxesHelper(3);
// cube.quaternion.set()
scene.add(cube, camera);

// Animation
// 一帧执行一次该函数（帧率根据电脑刷新率有关）
// const tick = () => {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);

//   requestAnimationFrame(tick);
// };

//获取每一帧所花费的时间计算
// let time = Date.now();
// const tick = () => {
//   const current = Date.now();
//   const deltaTime = current - time;
//   time = current;
//   // deltaTime 为毫秒
//   // console.log(deltaTime);
//   cube.rotation.x += deltaTime * 0.001;
//   // cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
//   // 在每一帧上执行该函数,1秒60帧  1000/60=16.6667ms
//   requestAnimationFrame(tick);
// };

// 使用内建函数（in-build）
// const clock = new Clock();
// const tick = () => {
//   //获得该Clock自创建至执行所耗费的时间（s）
//   const elapsedTime = clock.getElapsedTime();
//   // 以cos函数曲线方式移动（-1，1）
//   cube.position.y = Math.cos(elapsedTime);

//   renderer.render(scene, camera);

//   requestAnimationFrame(tick);
// };

const clock = new Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  camera.position.y = Math.cos(elapsedTime) * 5;
  camera.position.x = Math.sin(elapsedTime) * 4;
  camera.lookAt(cube.position);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
  // camera.updateProjectionMatrix;
};
tick();

// 使用gsap
// let animationId;
// gsap.to(cube.position, { duration: 1, delay: 0, x: 2 });
// const tick = () => {
//   renderer.render(scene, camera);
//   animationId = requestAnimationFrame(tick);

//   console.log(cube.position.x);
//   if (cube.position.x === 2) {
//     cancelAnimationFrame(animationId);
//   }
// };
// tick();
</script>

<style>

</style>
