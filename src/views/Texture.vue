<script lang="ts" setup>
import { LoadingManager, MeshBasicMaterial, MirroredRepeatWrapping, RepeatWrapping, Texture, TextureLoader } from "three";
import { initScene } from "../units/InitScene"

const world = initScene()
const { log } = console

// loadingManager 管理（效果较好）
const loadManger = new LoadingManager()
loadManger.onStart = () => { log('start') }
loadManger.onLoad = () => { log('finish') }

const textureLoader = new TextureLoader(loadManger)
const doorTexture = textureLoader.load('src/assets/texture-background.jpg')
doorTexture.repeat.x = 2
doorTexture.repeat.y = 3
// warpS=>x wrapT=>y
doorTexture.wrapS = MirroredRepeatWrapping
doorTexture.wrapT = RepeatWrapping

const material = new MeshBasicMaterial({ map: doorTexture })

world.object.material = material
world.animation()

// build-in TextureLoader
// const textureLoader = new TextureLoader()
// const texture = textureLoader.load('/src/assets/texture-background.jpg', () => {
//     world.object.material = new MeshBasicMaterial({ map: texture })
// })

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