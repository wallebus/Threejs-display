<template></template>
<script lang="ts" setup>
import { CreateCanvas } from "@/unlits/CreateCanvs";
import {
  AxesHelper,
  BoxGeometry,
  Color,
  ConeGeometry,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

// 获取容器
const canvas = CreateCanvas();
const Size = {
  Width: canvas.clientWidth,
  Height: canvas.clientHeight,
};
// 获取场景
const scene = new Scene();

//物体
const Cube = {
  width: 1,
  height: 1,
  depth: 1,
};
const Cone = {
  radius: 0.7,
  height: 2,
  radialSegments: 16,
  heightSegments: 8,
  openEnded: true,
  position: {
    x: 1,
    y: 1,
    z: 1,
  },
  scale: {},
};
const coneGeometry = new ConeGeometry(
  Cone.radius,
  Cone.height,
  Cone.radialSegments,
  Cone.heightSegments,
  Cone.openEnded
);
const boxGeometry = new BoxGeometry(Cube.width, Cube.height, Cube.depth);

const material1 = new MeshBasicMaterial({ color: new Color("blue") });
const material2 = new MeshBasicMaterial({ color: new Color("red") });
// const DepthMaterial = new MeshDepthMaterial(material);
const cone = new Mesh(coneGeometry, material1);
const cube = new Mesh(boxGeometry, material2);
// cone.position.set(0, 0, 0);

//相机
const Camera = {
  fov: 45,
  aspect: Size.Width / Size.Height,
  near: 0.1,
  fear: 20,
  position: {
    x: 5,
    y: 2,
    z: 6,
  },
};
const camera = new PerspectiveCamera(
  Camera.fov,
  Camera.aspect,
  Camera.near,
  Camera.fear
);
camera.lookAt(new Vector3(0, 0, 0));
camera.position.set(Camera.position.x, Camera.position.y, Camera.position.z);

//渲染器
const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setSize(Size.Width, Size.Height);

function toDegrees(radian: number) {
  return Math.PI * radian;
}
// 变换|距离

cone.scale.set(1, 0.6, 1);
cone.position.set(0, 1.1, 0);
// cone.rotation.y = toDegrees(1);
// cone.rotation.x = toDegrees(d.3);
cube.position.set(0, 0, 0);

console.log(cone.position.distanceTo(cube.position));
console.log(cone.position.normalize());
const group = new Group();

group.add(cube, cone);
group.position.z = 0;
camera.lookAt(new Vector3(0, 1, 0));

const axesHelper = new AxesHelper(2);

// 添加至容器中
scene.add(group, camera, axesHelper);
renderer.render(scene, camera);
</script>
<style></style>
