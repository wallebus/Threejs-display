<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import GUI from 'lil-gui';
// import { useStorage } from '@vueuse/core';
// import GUI from 'lil-gui';
import { Color, DirectionalLight, EquirectangularReflectionMapping, FrontSide, LoadingManager, Material, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, TextureLoader, Vector2, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { onUnmounted, ref } from 'vue';

import alpha from '~/door/alpha.jpg'
import AO from '~/door/AO.jpg'
import color from '~/door/color.jpg'
import height from '~/door/height.jpg'
import metalness from '~/door/metalness.jpg'
import normal from '~/door/normal.jpg'
import roughness from '~/door/roughness.jpg'
// import env from '~/env.hdr'

// Scene size
const size = {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
}
const plane = {
    width: 3,
    height: 5,
    widthSegments: 36,
    heightSegments: 36,

}
// Init scene
const aspect = size.width / size.height;
const canvas = document.querySelector('canvas') || CreateCanvas()
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scene = new Scene()
const camera = new PerspectiveCamera(
    75,
    aspect,
    0.1,
    20
)
camera.position.z = 5;

const mapP = {
    displacementScale: 0.1,
    roughness: 0.6,
    metalness: 0.7,
    normalX: 1,
    normalY: 2
}

// Init cube
const geometry = new PlaneGeometry(plane.width, plane.height, plane.widthSegments, plane.heightSegments)
const control = new OrbitControls(camera, canvas)
const Light = new DirectionalLight(new Color('white'), 1)
// Light.position.set(1.5, 1, 3)

const manager = new LoadingManager()

let progress = ref(0)
manager.onProgress = (url, loaded, total) => {
    progress.value = loaded / total * 100;
    console.log(progress.value)
}

const loader = new TextureLoader(manager);
const alphaM = loader.load(alpha)
const heightM = loader.load(height)
const AOM = loader.load(AO)
const roughnessM = loader.load(roughness)
const colorM = loader.load(color)
const normalM = loader.load(normal)
const metalnessM = loader.load(metalness)
const hdeLoader = new RGBELoader(manager)
hdeLoader.load('src/assets/env.hdr', (envM) => {
    envM.mapping = EquirectangularReflectionMapping
    scene.background = envM
    scene.environment = envM
});

const material = new MeshStandardMaterial({
    map: colorM,
    alphaMap: alphaM,
    displacementMap: heightM,
    displacementScale: mapP.displacementScale,
    // displacementBias: 1.5,
    aoMap: AOM,
    roughnessMap: roughnessM,
    roughness: mapP.roughness,
    normalMap: normalM,
    normalScale: new Vector2(mapP.normalX, mapP.normalY),
    metalnessMap: metalnessM,
    metalness: mapP.metalness,
    side: FrontSide,
})
let mesh = new Mesh(geometry, material)
scene.add(mesh, camera, Light)

// Animation
const tick = (() => {
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
})
tick()

// Window resize
window.addEventListener('resize', () => {

    size.width = window.innerWidth * 0.8;
    size.height = window.innerHeight * 0.8;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height)
}, false)

const gui = new GUI({ autoPlace: true, width: 200 })
for (let item in mapP) {
    gui.add(mapP, item).max(2).min(0).onChange((value: Number) => { material[item as keyof MeshStandardMaterial] = value })
}

gui.add(mesh.rotation, 'y').max(Math.PI / 4).min(-Math.PI / 4).name('rotation.y')
onUnmounted(() => {
    gui.destroy()
})

</script>

<template >
    <h2 v-if="progress < 100">{{ progress }} %</h2>
</template>

<style>
h2 {
    position: absolute;
    height: 80%;
    width: 100%;
    text-align: center;
    line-height: 80vh;
    z-index: 2;
}

.lil-gui.autoPlace {
    left: 15px;
    bottom: 0;
    top: auto
}
</style>