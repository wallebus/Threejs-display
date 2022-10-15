<template>
  <div id="check">
    <label for="">perSpective</label>
    <input type="radio" name="camera" :value="0" v-model="checked" checked />
    <label for="">orthoGraphic</label>
    <input type="radio" name="camera" :value="1" v-model="checked" />
  </div>
  <h3>Touch and mousemove will rotate the cube</h3>
</template>

<script lang="ts" setup>
// import {onMounted, ref} from"vue"
import {
  AxesHelper,
  BoxGeometry,
  Camera,
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { reactive, ref, render, watch } from "vue";
import { CreateCanvas } from "../units/CreateCanvas";
const scene = new Scene();

// if (document.querySelector("canvas") === null) {
const canvas = CreateCanvas();
// const canvas = document.querySelector("canvas") as HTMLElement;

const Size = reactive({
  width: window.innerWidth * 0.8,
  height: window.innerHeight * 0.8,
});

// camera.position.set(2, 2, 2);

const geometry = new BoxGeometry(2, 2, 2);
const material = new MeshBasicMaterial({ color: new Color("red") });
const cube = new Mesh(geometry, material);

const renderer = new WebGLRenderer({ canvas: canvas });

renderer.setSize(Size.width, Size.height);

let aspect = Size.width / Size.height;
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

// const cursor = {
//   x: 0,
//   y: 0,
// };
// // 鼠标事件
// window.addEventListener("mousemove", (e) => {
//   // console.log(e.clientX, e.clientY);
//   cursor.x = e.clientX / Size.width - 0.5;
//   cursor.y = e.clientY / Size.height - 0.5;
//   console.log(cursor);
// });

// 副作用函数
const Cameras = [perSpective, orthoGraphic];
let camera: PerspectiveCamera | OrthographicCamera;
let controls: OrbitControls;

function cameraChange() {
  camera = Cameras[checked.value];
  camera.position.z = 5;
  camera.lookAt(cube.position);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
}
// 绑定checkbox
let checked = ref(0);
watch(checked, cameraChange, { immediate: true });

window.addEventListener("resize", () => {
  Size.width = window.innerWidth * 0.8;
  Size.height = window.innerHeight * 0.8;
  // console.log(aspect);
});

function changeAspect() {
  aspect = Size.width / Size.height;
  perSpective.aspect = aspect;
  orthoGraphic.left = -3 * aspect;
  orthoGraphic.right = 3 * aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(Size.width, Size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
watch(Size, changeAspect);

const tick = () => {
  // console.log(camera);
  // camera.position.set(cursor.x, cursor.y, 3);
  // camera.position.x = cursor.x * 5;
  // camera.position.y = cursor.y * 5;
  controls.update();
  // camera.updateMatrixWorld();
  // cube.quaternion.set()
  scene.add(cube, camera);
  // cube.rotation.y = clock.getElapsedTime();
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
  margin: 5px;
}

h3 {
  color: aqua;
}
</style>
