<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import {
    AxesHelper,
    BufferAttribute,
    BufferGeometry,
    DoubleSide,
    Mesh,
    PerspectiveCamera, PlaneGeometry, RawShaderMaterial, Scene, WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import testVertex from '../shader/test/vertexShader.glsl?raw'
import testFragment from '../shader/test/fragmentShader.glsl?raw'

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

const material = new RawShaderMaterial({
    vertexShader: testVertex,
    fragmentShader: testFragment,
    side: DoubleSide,
    transparent: true
})
const plane = new Mesh(new PlaneGeometry(2, 2, 32, 32), material)
plane.rotation.x = -Math.PI / 8

const count = plane.geometry.attributes.position.count
const randoms = new Float32Array(count)
for (let i = 0; i < count; i++) [
    randoms[i] = Math.random()
]
plane.geometry.setAttribute('mRandom', new BufferAttribute(randoms, 1))
console.log(plane.geometry.attributes.mRandom)
const axHelper = new AxesHelper(3)
scene.add(camera, plane)
animate()

function animate() {
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
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



