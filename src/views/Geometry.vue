<script lang="ts" setup>
import { BoxGeometry, CircleGeometry, Color, CylinderGeometry, DoubleSide, Mesh, Object3D, OctahedronGeometry, SphereGeometry, TorusGeometry } from "three";
import { watch } from "vue";

import { initScene } from "../units/InitScene"
import { useStorage } from "@vueuse/core"

const Init = initScene()

const Box = new BoxGeometry(2, 2, 2)
const Sphere = new SphereGeometry(2, 12, 12)
const Circle = new CircleGeometry(3, 12, 0, Math.PI * 1.5)
const Cylinder = new CylinderGeometry(1.5, 1.5, 3.5, 16, 2)
const Torus = new TorusGeometry(2, 0.5, 6, 8)
const Octahearon = new OctahedronGeometry(2, 1)

Init.material.wireframe = true
Init.material.color = new Color("skyblue")
Init.material.side = DoubleSide

const check = useStorage('check', 0, sessionStorage)

const Objects = [Box, Sphere, Circle, Cylinder, Torus, Octahearon]

// let gui: dat.GUI
function geometryChange() {
    let geometry = Objects[Number(check.value)]
    const object = new Mesh(geometry, Init.material)
    // console.log()
    // if (typeof (gui) !== "undefined") {
    //     let old = gui as dat.GUI
    //     old.destroy()
    // }
    // gui = new dat.GUI({ width: 160 })

    // guiOptions(object)
    Init.scene.clear()
    Init.scene.add(object)
}

// const Guis = new Array(Objects.length)
// function guiOptions(object: Object3D) {

//     gui.add(object.position, 'x')
//     gui.add(object.position, 'y')
//     gui.add(object.position, 'z')
// }

watch(check, geometryChange, { immediate: true })
Init.camera.position.z = 6
Init.animation()

// onUnmounted(() => {
//     gui.destroy()
// })

const checkValue = [{ name: "Box", value: 0 }, { name: "Sphere", value: 1 }, { name: "Circle", value: 2 }, { name: "Cylinder", value: 3 }, { name: "Torus", value: 4 }, { name: "Octahearon", value: 5 }]
</script>
<template >
    <div class="checkArea">
        <div v-for="item in checkValue" class="item">
            <label for="">{{ item.name }}</label>
            <input type="radio" name="geometry" :value="item.value" v-model="check">
        </div>
    </div>
</template>
<style scoped>
.checkArea {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2px 0;
}

.item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
}

.item input {
    margin-left: 1px;
}

h3 {
    color: aqua;
}
</style>