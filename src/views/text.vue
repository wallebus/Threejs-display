<template >
    <div>

    </div>
</template>
<script lang="ts" setup>
import { initScene } from "../units/InitScene"

const Init = initScene()

const renderer = Init.renderer
const camera = Init.camera
const cube = Init.cube
const scene = Init.scene
const controls = Init.controls
const tick = () => {
    controls.update()
    scene.add(cube, camera);
    // cube.rotation.y = clock.getElapsedTime();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};
tick();

scene.add(cube, camera)
renderer.render(scene, camera)
</script>
<style>

</style>