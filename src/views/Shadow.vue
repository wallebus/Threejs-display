<script lang="ts" setup>
import App from "@/App.vue";
import GUI from "lil-gui";
import { AmbientLight, Clock, Color, DirectionalLight, DirectionalLightHelper, DoubleSide, Group, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, PointLight, PointLightHelper, SphereGeometry, SpotLight, SpotLightHelper, Vector3 } from "three";
import { onUnmounted, reactive, ref, shallowReactive, watch } from "vue";
import { initScene } from "../units/InitScene"

// renderer.shadowMap.enable
// object.castShadow
// plane.receiveShadow 
// light.castShadow

const world = initScene()
const scene = world.scene
const camera = world.camera
const renderer = world.renderer
camera.position.set(-1, 3, 8)

//开启阴影渲染 与 正确的物理渲染
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true


const white = new MeshStandardMaterial({
    color: new Color('white'),
    // metalness: 0.8,
    roughness: 0.5,
    side: DoubleSide
})
world.object.material = white
// world.object.position.x = 1
world.object.castShadow = true

const plane = new Mesh(new PlaneGeometry(8, 7), white)
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2
plane.position.y = -1.5
scene.add(plane)

const lightColor = new Color('AliceBlue')


//环境光
const ambLight = new AmbientLight(lightColor, 0.8)
const hemLight = new HemisphereLight(new Color("rgb(160,60,70)"), new Color("rgb(100,60,150)"), 1)

// 聚光灯 [color,lightInit,distance,angle,锥形衰减，距离衰减量]
const spotLight = new SpotLight(lightColor, 1, 15, Math.PI / 4, 0, 0)
const spotHelper = new SpotLightHelper(spotLight)
const spotGroup = new Group()
spotGroup.add(spotLight, spotHelper)

spotLight.position.set(0, 4, 0)
spotLight.target = world.object
spotLight.castShadow = true
// spotLight.shadow.focus = 0.1

// 平行光
const dirLight = new DirectionalLight(lightColor, 1)
const dirHelper = new DirectionalLightHelper(dirLight)
const dirGroup = new Group()
dirGroup.add(dirLight, dirHelper)
dirLight.position.set(2, 2, 1)
dirLight.castShadow = true


// 点光源
const pointLight = new PointLight(lightColor, 1, 10, 0)
const pointHelper = new PointLightHelper(pointLight, 0.2)
const pointGrop = new Group()
pointGrop.add(pointLight, pointHelper)
pointLight.castShadow = true
// const ballLight = new Mesh(new SphereGeometry(0.15), new MeshBasicMaterial({ color: lightColor }))
// ballLight.position.set(0, 3, 0)
// ballLight.add(pointLight)
// pointLight.shadow.radius = 10

// 类似直角相机 设置计算阴影的范围
const shadowCamera = {
    mapSize: 512,
    near: 0.1,
    far: 7,
    left: 2,
    right: 2,
    top: 2,
    bottom: 2,
    size: 3
}

dirLight.shadow.mapSize.set(shadowCamera.mapSize, shadowCamera.mapSize)
const lightCamera = dirLight.shadow.camera
// lightCamera.near = 1
lightCamera.far = shadowCamera.far
lightCamera.left = -shadowCamera.size
lightCamera.right = shadowCamera.size
lightCamera.top = shadowCamera.size
lightCamera.bottom = -shadowCamera.size


// Init GUI
let dirGUI: GUI
function initGUI(next: number) {
    if (next !== 0) {
        dirGUI.destroy()
        return
    };
    dirGUI = new GUI({ autoPlace: true, width: 200 })
    dirGUI.add(shadowCamera, 'far', 1, 7, 0.5).name('shadowFar').onChange((far: number) => {
        lightCamera.far = far
        lightCamera.updateProjectionMatrix()
    })
    dirGUI.add(shadowCamera, 'size', 0, 2, 0.5).name('shadowSize').onChange((size: number) => {
        lightCamera.left = -shadowCamera.size
        lightCamera.right = shadowCamera.size
        lightCamera.top = shadowCamera.size
        lightCamera.bottom = -shadowCamera.size
        lightCamera.updateProjectionMatrix()
    })
    dirGUI.add(dirLight.shadow, 'radius', 0, 20, 1)
}
initGUI(0)
onUnmounted(() => {
    dirGUI.destroy()
})
const lightIndex = ref(0)
const lightGroup = [dirGroup, spotGroup, pointGrop]


let currentLight = lightGroup[lightIndex.value]

watch(lightIndex, (next, per) => {
    scene.remove(lightGroup[per])
    scene.add(lightGroup[next])
    currentLight = lightGroup[next]

    initGUI(next)

})

scene.add(lightGroup[0], ambLight, hemLight)
world.animation()

// pointLight animation
const clock = new Clock()
function tick() {
    let time = clock.getElapsedTime()
    currentLight.position.x = Math.cos(time) * 3
    currentLight.position.z = Math.sin(time) * 1

    spotHelper.update()
    requestAnimationFrame(tick)
}
tick()

function toJumpShare() {
    window.location.replace('/jump')
}

</script>

<template >
    <div v-for="(light, index) in lightGroup" class="lightType">
        <label for="">{{ light.children[0].type }}</label>
        <input type="radio" name="light" :value="index" v-model="lightIndex">
    </div>
<!-- <div class="shadowMap">
        <label for="">shadowMap</label>
        <input type="radio" name="light" :value="3" @change="toJumpShare">
    </div> --></template >


<style scoped>
.lightType {
    display: inline-block;
    margin-left: 15px;
}

input {
    margin-left: 3px;
}

.shadowMap {
    display: inline-block;
    left: 10px;
}
</style>