<script lang="ts" setup>
import GUI from "lil-gui";
import { Clock, Color, DirectionalLight, DirectionalLightHelper, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, PointLight, PointLightHelper, SphereGeometry, SpotLight, SpotLightHelper, Vector3 } from "three";
import { onUnmounted, reactive, ref, watch } from "vue";
import { initScene } from "../units/InitScene"

// renderer.shadowMap.enable
// object.castShadow
// plane.receiveShadow 
// light.castShadow

const world = initScene()
const scene = world.scene
const camera = world.camera
const renderer = world.renderer
camera.position.set(-1, 3, 6)

//开启阴影渲染 与 正确的物理渲染
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true


const white = new MeshStandardMaterial({
    color: new Color('white'),
    side: DoubleSide
})
world.object.material = white
// world.object.position.x = 1
world.object.castShadow = true

const plane = new Mesh(new PlaneGeometry(8, 6), white)
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2
plane.position.y = -1.5
scene.add(plane)

const lightColor = new Color('AliceBlue')

// 聚光灯 [color,lightInit,distance,angle,锥形衰减，距离衰减量]
const spotLight = new SpotLight(lightColor, 1, 15, Math.PI / 4, 0, 0)
const spotHelp = new SpotLightHelper(spotLight)
spotLight.position.set(0, 4, 0)
spotLight.target = world.object
spotLight.castShadow = true
// spotLight.shadow.focus = 0.1

// 平行光
const dirLight = new DirectionalLight(lightColor, 1)
const dirHelper = new DirectionalLightHelper(dirLight)
dirLight.position.set(2, 2, 1)
dirLight.castShadow = true

// 点光源
const pointLight = new PointLight(lightColor, 1, 10, 0)
pointLight.castShadow = true
// pointLight.shadow.radius = 10

const lightIndex = ref(0)
const Light = reactive([dirLight, spotLight, pointLight])
const ballLight = new Mesh(new SphereGeometry(0.15), new MeshBasicMaterial({ color: lightColor }))
ballLight.add(Light[lightIndex.value])
ballLight.position.set(0, 3, 0)

watch(lightIndex, (next, per) => {
    ballLight.remove(Light[per])
    ballLight.add(Light[next])
})

world.scene.add(ballLight)
world.animation()

// pointLight animation
const clock = new Clock()
function tick() {
    let time = clock.getElapsedTime()
    ballLight.position.x = Math.cos(time) * 3
    ballLight.position.z = Math.sin(time) * 3

    requestAnimationFrame(tick)
}
tick()

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
// const gui = new GUI({ autoPlace: true, width: 200 })
// gui.add(shadowCamera, 'far', 1, 7, 0.5).name('shadowFar').onChange((far: number) => {
//     lightCamera.far = far
//     lightCamera.updateProjectionMatrix()
// })
// gui.add(shadowCamera, 'size', 0, 2, 0.5).name('shadowSize').onChange((size: number) => {
//     lightCamera.left = -shadowCamera.size
//     lightCamera.right = shadowCamera.size
//     lightCamera.top = shadowCamera.size
//     lightCamera.bottom = -shadowCamera.size
//     lightCamera.updateProjectionMatrix()

// })
// onUnmounted((() => {
//     gui.destroy()
// }))

</script>

<template >
    <div v-for="(light, index) in Light" class="lightType">
        <label for="">{{ light.type }}</label>
        <input type="radio" name="light" :value="index" v-model="lightIndex">
    </div>
</template >

<style scoped>
.lightType {
    display: inline-block;
    margin-left: 15px;
}

input {
    margin-left: 3px;
}
</style>