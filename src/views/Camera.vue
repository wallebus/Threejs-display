<template>
  <div id="check">
    <label for="">perSpective</label>
    <input type="radio" name="camera" :value="0" v-model="checked" checked />
    <label for="">orthoGraphic</label>
    <input type="radio" name="camera" :value="1" v-model="checked" />
  </div>
</template>

<script lang="ts" setup>
// import {onMounted, ref} from"vue"
import {
  AxesHelper,
  BoxGeometry,
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { reactive, ref } from "vue";
import { CreateCanvas } from "../unlits/CreateCanvs";
const scene = new Scene();

// if (document.querySelector("canvas") === null) {
const canvas = CreateCanvas();
// const canvas = document.querySelector("canvas") as HTMLElement;

const Size = {
  width: canvas.clientWidth,
  height: canvas.clientHeight,
};

// camera.position.set(2, 2, 2);

const geometry = new BoxGeometry(2, 2, 2);
const material = new MeshBasicMaterial({ color: new Color("red") });
const cube = new Mesh(geometry, material);

const renderer = new WebGLRenderer({ canvas: canvas });

renderer.setSize(Size.width, Size.height);

const aspect = Size.width / Size.height;
const perSpective = new PerspectiveCamera(75, aspect, 0.1, 20);

// 正交投影 通过定义四个锥面确定可视空间
const orthoGraphic = new OrthographicCamera(
  -3 * aspect,
  3 * aspect,
  3,
  -3,
  0.1,
  100
);
const Cameras = [perSpective, orthoGraphic];
let checked = ref(0);

const clock = new Clock();
const tick = () => {
  const camera = Cameras[checked.value];
  // console.log(camera);
  camera.position.set(3, 3, 3);
  camera.lookAt(cube.position);

  // cube.quaternion.set()
  scene.add(cube, camera);

  cube.rotation.y = clock.getElapsedTime();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};
tick();
</script>

<style>
#check {
  display: flex;
  justify-content: center;
  align-items: center;
}
label {
  margin: 8px;
}
</style>
