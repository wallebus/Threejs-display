<script lang="ts" setup>
import { MeshBasicMaterial, Texture, TextureLoader } from "three";
import { initScene } from "../units/InitScene"

const world = initScene()

// build-in loader
const textureLoader = new TextureLoader()
const texture = textureLoader.load('/src/assets/texture-background.jpg', () => {
    world.object.material = new MeshBasicMaterial({ map: texture })
})

world.animation()

// pure js
// const image = new Image()
// image.src = '/src/assets/texture-background.jpg'
// image.onload = () => {
//     const texture = new Texture(image)
//     texture.needsUpdate = true
//     const material = new MeshBasicMaterial({ map: texture })
//     world.object.material = material
//     console.log("loaded")
// }

</script>
<template >
    <div>

    </div>
</template>
<style>

</style>