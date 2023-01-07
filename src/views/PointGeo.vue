<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import { AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, Group, LoadingManager, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, Points, PointsMaterial, Scene, ShapeGeometry, SphereGeometry, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

camera.position.z = 2
renderer.setSize(size.width(), size.height())
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

const pointsGeometry = new SphereGeometry(1, 32, 32)
const pointsMaterial = new PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})
const particles = new Points(pointsGeometry, pointsMaterial)

scene.add(camera, particles)
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