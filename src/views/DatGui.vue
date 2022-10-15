<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import gsap from "gsap";
import GUI from "lil-gui";
import { AxesHelper, Color, Mesh, Object3D } from "three";
import { flattenJSON } from "three/src/animation/AnimationUtils";
import { onUnmounted, type Ref } from "vue";
import { initScene } from "../units/InitScene"
// gsap.registerPlugin()

const world = initScene()
const gui = new GUI({ autoPlace: true, width: 220 })
// gui.close()
const cube = world.object
const axesHelper = new AxesHelper(3)
cube.add(axesHelper)

gui.add(cube.position, 'x', -3, 3, 0.01).name("cube.x")
gui.add(cube.position, 'y').min(-3).max(3).step(0.1).name('cube.y')
gui.add(cube, 'visible')
gui.add(cube.material, 'wireframe').name('wireframe(框架)')
gui.add(axesHelper, 'visible').name("axesHelp(轴线)")

const params = {
    size: 2,
    segments: 1,
    color: new Color("red"),
    gsap: () => {
        gsap.to(cube.rotation, { direction: 1, y: cube.rotation.y + Math.PI * 2 })
    }
}
gui.addColor(params, 'color').onChange(() => {
    cube.material.color.set(params.color)
})
onUnmounted(() => {
    gui.destroy()
})
gui.add(params, "gsap").name("rotate(旋转物体)")
world.animation()
// gui.add(params, 'size', 1, 10, 1).name('size(大小)').onChange(() => {
//     let pars = cube.geometry.parameters
//     pars.depth = params.size
//     pars.height = params.size
//     pars.width = params.size
//     // console.log(cube.geometry.dispose())
// })
// gui.add(params, 'segments', 1, 99, 1).onChange(() => {
//     let pars = cube.geometry.parameters
//     pars.depthSegments = params.segments
//     pars.heightSegments = params.segments
//     pars.widthSegments = params.segments
// })

</script>
<template >
    <div>

    </div>
</template>
<style>

</style>