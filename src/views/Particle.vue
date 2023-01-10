<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import { AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, Color, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, Group, LoadingManager, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, Points, PointsMaterial, Scene, ShapeGeometry, SphereGeometry, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import particlePic from '../assets/particles/2.png'

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

const particleTexture = new TextureLoader().load(particlePic)
const pointsGeometry = new SphereGeometry(1, 32, 32)
const pointsMaterial = new PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    color: new Color('#ff88cc'),
    map: particleTexture,
    transparent: true,
    alphaMap: particleTexture,
    alphaTest: 0.001  // 默认值为0,设为0.001,则不会渲染透明度为0的像素值。
})
const particles = new Points(pointsGeometry, pointsMaterial)

// Geometry
const particlesGeometry = new BufferGeometry()
const count = 500

const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3))

const particlesBuffer = new Points(particlesGeometry, pointsMaterial)

scene.add(camera, particles, particlesBuffer)
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