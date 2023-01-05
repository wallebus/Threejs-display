<script lang="ts" setup>
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json?url'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Clock, Color, Fog, Group, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshToonMaterial, PerspectiveCamera, PointLight, Scene, TextureLoader, TorusGeometry, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CreateCanvas } from '@/units/CreateCanvas';
import ua from 'ua-parser-js'
import textTexture8 from '~/text/8.png';


import { onMounted } from 'vue';
import gsap from 'gsap';

// let parser = new ("user-agent")
const size = {
  width: window.innerWidth,
  height: window.innerHeight * 0.8,
  aspect() {
    return this.width / this.height
  }
}

const canvas = document.querySelector('canvas') || CreateCanvas()
const scene = new Scene()
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
const camera = new PerspectiveCamera(80, size.aspect(), 0.5, 50)
const control = new OrbitControls(camera, canvas)
const group = new Group()

let text: Mesh
const fontLoader = new FontLoader()
fontLoader.load(typefaceFont, (font) => {
  const textGeometry = new TextGeometry('Hello Three.js', {
    font: font,
    size: 0.6,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3
  })
  textGeometry.center()

  const textureLoader = new TextureLoader()
  const torusMap = textureLoader.load(textTexture8)
  const textMaterial = new MeshMatcapMaterial({ matcap: torusMap })
  const torusMaterial = new MeshMatcapMaterial({ transparent: true, opacity: 0.8, matcap: torusMap })

  const normalMaterial = new MeshNormalMaterial()
  const depthMaterial = new MeshDepthMaterial({ opacity: 1 })
  // const toodMaterial = new MeshToonMaterial({ map: map })
  text = new Mesh(textGeometry, textMaterial)

  scene.add(text)

  // 随机位置生成圆环
  const donutGeometry = new TorusGeometry(0.3, 0.2, 24, 32)

  for (let i = 0; i < 160; i++) {
    const donut = new Mesh(donutGeometry, torusMaterial)

    donut.position.x = (Math.random() - 0.5) * 12
    donut.position.y = (Math.random() - 0.5) * 12
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    group.add(donut)
    scene.add(group)
  }
})

camera.position.z = 5
scene.add(camera)
scene.fog = new Fog(new Color('blue'))
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight * 0.8;

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height)
}, false)

onMounted(() => {
  let animationId;
  gsap.from(camera.position, { delay: 0, z: 100, x: 100 })
  gsap.to(camera.position, { duration: 1, delay: 0, z: 4, x: 0 });

  gsap.from(camera.rotation, { delay: 0, x: -Math.PI / 2 });
  gsap.to(camera.rotation, { duration: 1, delay: 0, x: 0 });

  const tick = () => {
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(tick);

    if (camera.position.z === 5) {
      cancelAnimationFrame(animationId);
    }
  };
  tick();
})

const clock = new Clock()
const tick = (() => {
  const time = clock.getElapsedTime()
  group.rotation.x = Math.sin(time / 4) * 2
  group.rotation.y = Math.cos(time / 4) * 2

  // text.rotation.x = Math.sin(time / 4) * 2
  // text.rotation.y = Math.sin(time / 4) * 2
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
})
tick()

</script>

<template >

</template>

<style>

</style>