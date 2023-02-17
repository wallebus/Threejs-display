<script lang="ts" setup>
import {
    AxesHelper,
    BufferAttribute,
    BufferGeometry,
    Clock,
    DoubleSide,
    Mesh,
    PerspectiveCamera, PlaneGeometry, RawShaderMaterial, Scene, TextureLoader, Vector2, WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

import { CreateCanvas } from '@/units/CreateCanvas';
import testVertex from '../shader/test/vertexShader.glsl?raw'
import testFragment from '../shader/test/fragmentShader.glsl?raw'
import flag from '~/shader/flag.jpg'

const textureLoader = new TextureLoader()
const flagTexture = textureLoader.load(flag)

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
camera.position.z = 3
renderer.setSize(size.width(), size.height())
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

const uniforms = {
    uFrequency: { value: new Vector2(3, 3) },
    uTime: { value: 0 },
    uTexture: { value: flagTexture }
}

const material = new RawShaderMaterial({
    vertexShader: testVertex,
    fragmentShader: testFragment,
    side: DoubleSide,
    transparent: true,
    uniforms: uniforms,
})

const gui = new GUI({ autoPlace: true })
gui.add(uniforms.uFrequency.value, 'x').min(0.1).max(12).step(0.1).name('x')
gui.add(uniforms.uFrequency.value, 'y').min(0.1).max(12).step(0.1).name('y')

const plane = new Mesh(new PlaneGeometry(3, 2, 32, 32), material)
plane.rotation.x = -Math.PI / 8

const count = plane.geometry.attributes.position.count
const randoms = new Float32Array(count)
for (let i = 0; i < count; i++) [
    randoms[i] = Math.random()
]
plane.geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1))

const axHelper = new AxesHelper(3)
const clock = new Clock()
scene.add(camera, plane)
tick()

function tick() {
    const elapsedTime = clock.getElapsedTime();
    plane.material.uniforms.uTime.value = elapsedTime;

    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}

// ———— Window adaptive ————
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



