<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import { AmbientLight, BoxGeometry, Color, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, Group, LoadingManager, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, Scene, SphereGeometry, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RepeatWrapping } from 'three';
import { ref } from 'vue';

const bricksUrls = import.meta.glob('../assets/bricks/*.jpg', { eager: true })
const doorUrls = import.meta.glob('../assets/door/*.jpg', { eager: true })
const grassUrls = import.meta.glob('../assets/grass/*.jpg', { eager: true })

// Texture load
const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager)

const bricksTexture = loadTexture(bricksUrls, textureLoader)
const grassTexture = loadTexture(grassUrls, textureLoader)
const doorTexture = loadTexture(doorUrls, textureLoader)

grassTexture.color.repeat.set(8, 8)
grassTexture.AO.repeat.set(8, 8)
grassTexture.normal.repeat.set(8, 8)
grassTexture.roughness.repeat.set(8, 8)

grassTexture.color.wrapS = RepeatWrapping
grassTexture.AO.wrapS = RepeatWrapping
grassTexture.normal.wrapS = RepeatWrapping
grassTexture.roughness.wrapS = RepeatWrapping

grassTexture.roughness.wrapT = RepeatWrapping
grassTexture.normal.wrapT = RepeatWrapping
grassTexture.AO.wrapT = RepeatWrapping
grassTexture.color.wrapT = RepeatWrapping

const progress = ref("LOADING")
const loadState = ref(1)
manager.onProgress = (url, loaded, total) => {
    progress.value = `${url} ${Math.floor(loaded / total * 100)}%`
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
        map: grassTexture.color,
        aoMap: grassTexture.AO,
        aoMapIntensity: 2,
        roughnessMap: grassTexture.roughness,
        roughness: 1,
        normalMap: grassTexture.normal
    })
)
const walls = new Mesh(
    new BoxGeometry(4, 2.5, 4),
    new MeshStandardMaterial({
        map: bricksTexture.color,
        normalMap: bricksTexture.normal,
        roughnessMap: bricksTexture.roughness,
        aoMap: bricksTexture.AO
    })
)
const roof = new Mesh(
    new ConeGeometry(3.5, 1, 4),
    new MeshStandardMaterial({ color: '#b35f45' })
)
const door = new Mesh(
    new PlaneGeometry(2, 2.2, 32, 32),
    new MeshStandardMaterial({
        map: doorTexture.color,
        aoMap: doorTexture.AO,
        displacementMap: doorTexture.height,
        displacementScale: 0.1,
        roughnessMap: doorTexture.roughness,
        roughness: 0.8,
        metalnessMap: doorTexture.metalness,
        normalMap: doorTexture.normal,
        alphaMap: doorTexture.alpha,
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
const pointLight = new PointLight(new Color('#ff7d46'), 1, 10)
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

function loadTexture(urlObject: any, textureLoader: TextureLoader) {
    let object = {} as any
    for (const [key, value] of Object.entries(urlObject)) {
        object[key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))] = textureLoader.load((value as any).default)
    }
    return object
}

</script>

<template >
    <h1 v-if="loadState" style=" opacity: 0.8;">{{ progress }}</h1>
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