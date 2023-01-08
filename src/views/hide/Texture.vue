<script lang="ts" setup>
import { AmbientLight, BackSide, Color, DirectionalLight, DoubleSide, FrontSide, HemisphereLight, LinearMipMapLinearFilter, LoadingManager, MeshBasicMaterial, MeshStandardMaterial, MirroredRepeatWrapping, NearestFilter, RepeatWrapping, Texture, TextureLoader } from "three";
import { initScene } from "../../units/InitScene"
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
const material = new MeshStandardMaterial({
    alphaMap: doorTexture,
    map: doorTexture,
    transparent: true,
    opacity: 1,
    side: DoubleSide,
    aoMap: doorTexture,
    aoMapIntensity: 0.3,
})

const Light = new DirectionalLight(0xffffff, 1)
Light.position.set(6, 6, 6)
// const 

world.object.material = material as any
world.scene.add(Light)
world.animation()



// 纹理偏移 0-1
// doorTexture.offset.x += 1;

// 旋转
// doorTexture.center.set(1, 0)
// doorTexture.rotation = Math.PI / 4
// doorTexture.dispose()

// 像素平铺 当纹理像素覆盖大于1时 magFilter 小于1时 minFilter的的策略为三线性插值
// doorTexture.magFilter = NearestFilter
// doorTexture.minFilter = LinearMipMapLinearFilter

// 重复
// doorTexture.repeat.x = 10
// doorTexture.repeat.y = 10
// // warpS=>x wrapT=>y
// doorTexture.wrapS = MirroredRepeatWrapping
// doorTexture.wrapT = MirroredRepeatWrapping


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
h2 {
    position: absolute;
    height: 80%;
    width: 100%;
    text-align: center;
    line-height: 80vh;
    z-index: 2;
}
</style>