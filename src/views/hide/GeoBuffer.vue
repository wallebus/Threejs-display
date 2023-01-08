
<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import {
    Scene,
    PerspectiveCamera,
    BufferGeometry,
    WebGLRenderer,
    MeshBasicMaterial,
    Color,
    Mesh,
    BufferAttribute,
    AxesHelper,
    Vector3
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from "lil-gui"
import { onUnmounted } from 'vue';

const size = {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8
}

const canvas = CreateCanvas();
const scene = new Scene();
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(size.width, size.height)
const camera = new PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    10
);
camera.position.z = 5
camera.position.set(-3.1, 2, -1)
camera.lookAt(new Vector3(-1, 2, 0))

const array = new Float32Array([
    -1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, -1.0, 2.0,

])
const geometry = new BufferGeometry()
geometry.setAttribute("position", new BufferAttribute(array, 3));

const mesh = new MeshBasicMaterial({ color: new Color('blue') })
const cube = new Mesh(geometry, mesh)

const control = new OrbitControls(camera, canvas)
const helper = new AxesHelper(3)

scene.add(cube, camera, helper);
function animation() {

    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animation)
}

animation()

</script>

<template>

</template>
<style >
.lil-gui.autoPlace {
    left: 15px;
    bottom: 0;
    top: auto
}
</style>