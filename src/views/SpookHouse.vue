<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import { Controller } from 'lil-gui';
import { AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, Group, LoadingManager, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, Scene, ShapeGeometry, SphereGeometry, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import doorColorPic from '~/door/color.jpg'
import doorAlphaPic from '~/door/alpha.jpg'
import doorAOPicPic from '~/door/AO.jpg'
import doorHeightPic from '~/door/height.jpg'
import doorMetalPic from '~/door/metalness.jpg'
import doorNormalPic from '~/door/normal.jpg'
import doorRoughPic from '~/door/roughness.jpg'
// ———— Init Scene ————
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
const fog = new Fog('#262837', 1, 15)

scene.fog = fog
renderer.setClearColor('#262837', 0.9)
camera.position.set(0, 5, 8)
renderer.setSize(size.width(), size.height())
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

// ———— Mesh group ———— 
// Texture
const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager)
const doorAO = textureLoader.load(doorAOPicPic)
const doorHeigh = textureLoader.load(doorHeightPic)
const doorMetal = textureLoader.load(doorMetalPic)
const doorRough = textureLoader.load(doorRoughPic)
const doorNormal = textureLoader.load(doorNormalPic)
const doorAlpha = textureLoader.load(doorAlphaPic)
// Mesh
const doorColor = textureLoader.load(doorColorPic)
const plane = new Mesh(
    new PlaneGeometry(19, 19),
    new MeshStandardMaterial({ color: new Color("rgb(120,100,100)") })
)
const walls = new Mesh(
    new BoxGeometry(4, 2.5, 4),
    new MeshStandardMaterial({ color: '#ac8e82' })
)
const roof = new Mesh(
    new ConeGeometry(3.5, 1, 4),
    new MeshStandardMaterial({ color: '#b35f45' })
)
const door = new Mesh(
    new PlaneGeometry(2, 2.2, 32, 32),
    new MeshStandardMaterial({
        map: doorColor,
        aoMap: doorAO,
        displacementMap: doorHeigh,
        displacementScale: 0.1,
        roughnessMap: doorRough,
        roughness: 0.8,
        metalnessMap: doorMetal,
        normalMap: doorNormal,
        alphaMap: doorAlpha,
        transparent: true,
    })
)
door.geometry.setAttribute('uv2', new Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
plane.rotation.x = -Math.PI / 2
walls.position.y = 1.25
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
/* 当两个面位于同一位置时会出现 z-fighting 的现象(像素闪烁),
   故在基本位置上+0.01。*/
door.position.set(0, 1, 2 + 0.01)

// Bushes
const bushGeometry = new SphereGeometry(1, 12, 12)
const bushMaterial = new MeshStandardMaterial({ color: '#89c854' })
const bush = new Mesh(bushGeometry, bushMaterial)
bush.scale.set(0.5, 0.5, 0.5)
bush.position.set(1.2, 0.2, 2.2)
const bush1 = bush.clone()
bush1.scale.set(0.25, 0.25, 0.25)
bush1.position.set(1.8, 0.1, 2.1)
const bush2 = bush.clone()
bush2.scale.set(0.4, 0.4, 0.4)
bush2.position.set(-0.8, 0.1, 2.2)
const bush3 = bush.clone()
bush3.scale.set(0.15, 0.15, 0.15)
bush3.position.set(-1, 0.05, 2.6)
// Graves
const graveGeometry = new BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new MeshStandardMaterial({ color: '#b2b6b1' })
const graves = new Group()
for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6     // Random radius 3-9
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    graves.add(grave)
}

const ground = new Group()
const house = new Group()
ground.add(plane, bush, bush1, bush2, bush3, graves)
house.add(walls, roof, door)

// ———— Light group ————
const pointLight = new PointLight(new Color('#ff7d46'), 1, 7)
const pointHelper = new PointLightHelper(pointLight, 0.2, pointLight.color)
const sunLight = new DirectionalLight(new Color("#b9d5ff"), 0.15)
const ambientLight = new AmbientLight(new Color("#b9d5ff"), 0.15)
const lightGroup = new Group()

pointLight.position.set(0, 2, 2.5)
lightGroup.add(pointLight, ambientLight, sunLight)

// ————— Render scene ———————
scene.add(ground, house, camera, lightGroup)
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

// ———— Functional fn ————
function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}


</script>

<template >

</template>

<style>

</style>