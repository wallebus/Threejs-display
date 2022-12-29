<script lang="ts" setup>
import GUI from "lil-gui";
import { Color, DirectionalLight, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, SphereGeometry } from "three";
import { onUnmounted } from "vue";
import { initScene } from "../units/InitScene"

// renderer.shadowMap.enable
// object.castShadow
// plane.receiveShadow 
// light.castShadow

const world = initScene()
const scene = world.scene
world.camera.position.set(-1, 3, 5)
world.renderer.shadowMap.enabled = true

const white = new MeshStandardMaterial({
    color: new Color('white'),
    side: DoubleSide
})
world.object.material = white
world.object.position.x = 1
world.object.castShadow = true

const plane = new Mesh(new PlaneGeometry(8, 5), white)
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2
plane.position.y = -1.5
scene.add(plane)

const dirLight = new DirectionalLight(0xffffff, 0.8)
dirLight.position.set(2, 2, 1)
// shadowSetting
dirLight.castShadow = true

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

console.log(lightCamera.left)
const gui = new GUI({ autoPlace: true, width: 200 })
gui.add(shadowCamera, 'far', 1, 7, 0.5).name('shadowFar').onChange((far: number) => {
    lightCamera.far = far
    lightCamera.updateProjectionMatrix()
})
gui.add(shadowCamera, 'size', 0, 2, 0.5).name('shadowSize').onChange((size: number) => {
    lightCamera.left = -shadowCamera.size
    lightCamera.right = shadowCamera.size
    lightCamera.top = shadowCamera.size
    lightCamera.bottom = -shadowCamera.size
    lightCamera.updateProjectionMatrix()

})
onUnmounted((() => {
    gui.destroy()
}))

world.scene.add(dirLight)
world.animation()

</script>

<template >
</template >

