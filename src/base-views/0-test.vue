<template >
    <div>

    </div>
</template>
<script lang="ts" setup>
import { BoxGeometry, Color, Mesh, MeshBasicMaterial } from "three";
import { initScene } from "../units/InitScene"

const Init = initScene()

const materials = new MeshBasicMaterial({ color: new Color("blue") })
const geometry = new BoxGeometry(4, 4, 4, 4)
const cube = new Mesh(geometry, materials)
Init.object = cube
Init.camera.position.z = 10



// const renderer = Init.renderer
// const camera = Init.camera
// const cube = Init.cube
// const scene = Init.scene
// const controls = Init.controls
// const tick = () => {
//     controls.update()
//     scene.add(cube, camera);
//     // cube.rotation.y = clock.getElapsedTime();
//     renderer.render(scene, camera);

//     requestAnimationFrame(tick);
// };
// tick();

// scene.add(cube, camera)
// renderer.render(scene, camera)
</script>
<style>

</style>