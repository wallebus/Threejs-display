<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import { AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, Group, LoadingManager, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, Scene, ShapeGeometry, SphereGeometry, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import doorColorPic from '~/door/color.jpg'
import doorAlphaPic from '~/door/alpha.jpg'
import doorAOPic from '~/door/AO.jpg'
import doorHeightPic from '~/door/height.jpg'
import doorMetalPic from '~/door/metalness.jpg'
import doorNormalPic from '~/door/normal.jpg'
import doorRoughPic from '~/door/roughness.jpg'

import bricksColorPic from '~/bricks/color.jpg'
import bricksAOPic from '~/bricks/AO.jpg'
import bricksNormalPic from '~/bricks/normal.jpg'
import bricksRoughPic from '~/bricks/roughness.jpg'

import grassColorPic from '~/grass/color.jpg'
import grassAOPic from '~/grass/AO.jpg'
import grassNormalPic from '~/grass/normal.jpg'
import grassRoughnessPic from '~/grass/roughness.jpg'
import { RepeatWrapping } from 'three';
import { ref } from 'vue';

// Texture
const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager)

const doorColor = textureLoader.load(doorColorPic)
const doorAO = textureLoader.load(doorAOPic)
const doorHeigh = textureLoader.load(doorHeightPic)
const doorMetal = textureLoader.load(doorMetalPic)
const doorRough = textureLoader.load(doorRoughPic)
const doorNormal = textureLoader.load(doorNormalPic)
const doorAlpha = textureLoader.load(doorAlphaPic)

const bricksColor = textureLoader.load(bricksColorPic)
const bricksAO = textureLoader.load(bricksAOPic)
const bricksNormal = textureLoader.load(bricksNormalPic)
const bricksRough = textureLoader.load(bricksRoughPic)

const grassColor = textureLoader.load(grassColorPic)
const grassAO = textureLoader.load(grassAOPic)
const grassNormal = textureLoader.load(grassNormalPic)
const grassRough = textureLoader.load(grassRoughnessPic)

grassColor.repeat.set(8, 8)
grassAO.repeat.set(8, 8)
grassNormal.repeat.set(8, 8)
grassRough.repeat.set(8, 8)
grassColor.wrapS = RepeatWrapping
grassAO.wrapS = RepeatWrapping
grassNormal.wrapS = RepeatWrapping
grassRough.wrapS = RepeatWrapping

grassColor.wrapT = RepeatWrapping
grassAO.wrapT = RepeatWrapping
grassNormal.wrapT = RepeatWrapping
grassRough.wrapT = RepeatWrapping

const progress = ref("LOADING")
const loadState = ref(1)
manager.onProgress = (url, loaded, total) => {
    progress.value = url + ' progress:' + loaded / total * 100
    if (loaded === total) {
        loadState.value = 0
    }
}

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

camera.position.set(0, 5, 8)
scene.fog = fog
renderer.setClearColor('#262837', 0.9)
renderer.shadowMap.enabled = true
renderer.setSize(size.width(), size.height())
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

// ———— Mesh group ———— 
// Mesh
const floor = new Mesh(
    new PlaneGeometry(19, 19),
    new MeshStandardMaterial({
        map: grassColor,
        aoMap: grassAO,
        aoMapIntensity: 2,
        roughnessMap: grassRough,
        roughness: 1,
        normalMap: grassNormal,
    })
)
const walls = new Mesh(
    new BoxGeometry(4, 2.5, 4),
    new MeshStandardMaterial({
        map: bricksColor,
        normalMap: bricksNormal,
        roughnessMap: bricksRough,
        aoMap: bricksAO
    })
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
setUv2([floor, walls, door])

floor.rotation.x = -Math.PI / 2
walls.position.y = 1.25
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
/* 当两个面位于同一位置时会出现 z-fighting 的现象(像素闪烁),
   故在基本位置上+0.01。*/
door.position.set(0, 1, 2 + 0.01)
floor.receiveShadow = true

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
    grave.castShadow = true
    graves.add(grave)
}

const ground = new Group()
const house = new Group()
ground.add(floor, bush, bush1, bush2, bush3, graves)
house.add(walls, roof, door)
ground.castShadow = true
house.castShadow = true

// ———— Light group ————
const pointLight = new PointLight(new Color('#ff7d46'), 1, 8)
const pointHelper = new PointLightHelper(pointLight, 0.2, pointLight.color)
const sunLight = new DirectionalLight(new Color("#b9d5ff"), 0.3)
const ambientLight = new AmbientLight(new Color("#b9d5ff"), 0.15)
const lightGroup = new Group()

sunLight.position.set(6, 6, 0)
pointLight.position.set(0, 2, 2.5)
lightGroup.add(pointLight, ambientLight, sunLight)
lightGroup.castShadow = true

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
function setUv2(array: Array<Mesh>) {
    array.map((target) => {
        target.geometry.setAttribute('uv2', new Float32BufferAttribute(target.geometry.attributes.uv.array, 2))
    })
}

</script>

<template >
    <h1 v-if="loadState">{{ progress }}</h1>
</template>

<style>
h1 {
    position: absolute;
    height: 100%;
    width: 80%;
    text-align: center;
    line-height: 80vh;
    z-index: 2;
}
</style>