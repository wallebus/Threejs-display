<script lang="ts" setup>
import {
    AmbientLight, AnimationMixer, BoxGeometry, Clock, Color, DirectionalLight, Float32BufferAttribute, Group, LoadingManager, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, Points, PointsMaterial, Scene, SphereGeometry, TextureLoader, WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Stats from 'stats.js';
import { onBeforeUnmount, } from 'vue';

import { CreateCanvas } from '@/units/CreateCanvas';
import fox from '~/models/Fox/glTF-Binary/Fox.glb?url'
import fligh from '~/models/FlightHelmet/glTF/FlightHelmet.gltf?url'
const size = {
    width() { return window.innerWidth },
    height() { return window.innerHeight * 0.8 },
    aspect() { return this.width() / this.height() }
}
const canvas = document.querySelector('canvas') || CreateCanvas();
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
const scene = new Scene()
const camera = new PerspectiveCamera(80, size.aspect(), 0.1, 50)
const control = new OrbitControls(camera, canvas)
camera.position.set(3, 4, 5)

const amLight = new AmbientLight('#ffffff', 1.5)
const directLight = new DirectionalLight('#ffffff', 2)
directLight.castShadow = true

const plane = new Mesh(new PlaneGeometry(10, 10), new MeshStandardMaterial({ color: new Color('gray'), roughness: 0.3 }))
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true

const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath(draco)
gltfLoader.setDRACOLoader(dracoLoader)

let mixer: AnimationMixer
let action
gltfLoader.load(fox, (fox) => {
    fox.scene.scale.set(0.05, 0.05, 0.05,)

    scene.add(fox.scene)
    fox.scene.children[0].castShadow = true
    mixer = new AnimationMixer(fox.scene)
    action = mixer.clipAction(fox.animations[1])
    action.play()
})

// Mesh 加载场景
// gltfLoader.load(fligh, (model) => {
//     scene.add(...model.scene.children)
// })

renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
renderer.setSize(size.width(), size.height())
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
scene.add(camera, amLight, directLight, plane)


let stats: Stats
stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
onBeforeUnmount(() => {
    document.body.removeChild(stats.dom)
})

const clock = new Clock()
let perElapsedTime = 0
animate()

function animate() {
    stats.begin()
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - perElapsedTime
    perElapsedTime = elapsedTime

    if (mixer) {
        mixer.update(deltaTime)
    }
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
    stats.end()
}

window.addEventListener('resize', () => {
    renderer.setSize(size.width(), size.height())
    camera.aspect = size.aspect()
    camera.updateProjectionMatrix()
})



</script>

<template >

</template>

<style>

</style>




