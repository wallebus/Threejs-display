<script lang="ts" setup>
import { Mesh, PlaneGeometry, SphereGeometry } from "three";
import { initScene } from "../units/InitScene"

const init = initScene()
const scene = init.scene
const sphere = new Mesh(new SphereGeometry(0.5, 16, 16), init.material)
sphere.position.x = 2
scene.add(sphere)


const plane = new Mesh(new PlaneGeometry(1, 1, 1, 1), init.material)


init.animation()

</script>
<template >
    <div>

    </div>
</template>
<style>

</style>