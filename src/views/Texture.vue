<script lang="ts" setup>
import { LoadingManager, MeshBasicMaterial, MirroredRepeatWrapping, NearestFilter, RepeatWrapping, Texture, TextureLoader } from "three";
import { initScene } from "../units/InitScene"
import img1 from "~/texture-background.jpg"
// import img2 from "~/texture-metal.png"
import { ref } from "vue";

const world = initScene()
const { log } = console

// loadingManager 多纹理贴图加载
let loading = ref(true)
const loadManger = new LoadingManager()
loadManger.onStart = () => { log('start') }
loadManger.onLoad = () => {
    loading.value = false;
    log('finish')
}

const textureLoader = new TextureLoader(loadManger)
const doorTexture = textureLoader.load(img1)
// doorTexture.rotation = Math.PI * 0.5
// doorTexture.magFilter = NearestFilter
// doorTexture.minFilter = NearestFilter
// doorTexture.repeat.x = 2
// doorTexture.repeat.y = 3
// // warpS=>x wrapT=>y
// doorTexture.wrapS = MirroredRepeatWrapping
// doorTexture.wrapT = RepeatWrapping

const material = new MeshBasicMaterial({ map: doorTexture })

world.object.material = material
world.animation()

// build-in TextureLoader
// const textureLoader = new TextureLoader()
// const texture = textureLoader.load('/src/assets/texture-background.jpg', () => {
//     world.object.material = new MeshBasicMaterial({ map: texture })
// })
</script>
<template >
    <h2 class="animate__flipInX" v-if="loading"> Loading... </h2>
</template>

<style scoped>

</style>