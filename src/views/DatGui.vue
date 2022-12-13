<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import GUI from 'lil-gui';
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onUnmounted } from 'vue';

// Scene size
const size = {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
}
const box = {
    width: 2,
    height: 2,
    depth: 2,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1

}
// Init scene
const aspect = size.width / size.height;
const canvas = CreateCanvas()
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scene = new Scene()
const camera = new PerspectiveCamera(
    75,
    aspect,
    0.1,
    20
)
camera.position.z = 5;

// Init cube
const geometry = new BoxGeometry(box.width, box.height, box.depth, box.widthSegments, box.heightSegments, box.depthSegments)
const mesh = new Mesh(geometry, new MeshBasicMaterial({ color: new Color('skyblue'), wireframe: true }))
const control = new OrbitControls(camera, canvas)


scene.add(mesh, camera)
// Animation
const tick = (() => {
    control.update()
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera)

    requestAnimationFrame(tick)
})
tick()

// Window resize
window.addEventListener('resize', () => {

    size.width = window.innerWidth * 0.8;
    size.height = window.innerHeight * 0.8;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height)
}, false)

// GUI
const gui = new GUI({ width: 200 })

let i = 0;
for (let parameter in box) {
    if (i <= 2) {
        gui.add(box, parameter).max(8).min(1).onChange(update)
    } else {
        gui.add(box, parameter).max(16).min(1).step(1).onChange(update)
    }
    i++;
}
gui.add(mesh.position, 'x', -3, 3, 0.01).name("cube.x")
gui.add(mesh.position, 'y').min(-3).max(3).step(0.1).name('cube.y')
gui.add(mesh.position, 'z').min(-3).max(3).step(0.1).name('cube.z')
gui.add(mesh, 'visible')


function updateGeometry(mesh: Mesh, geometry: BoxGeometry) {
    mesh.geometry.dispose()
    mesh.geometry = geometry
}
function update() {
    updateGeometry(mesh, new BoxGeometry(box.width, box.height, box.depth, box.widthSegments, box.heightSegments, box.depthSegments))
}

onUnmounted(() => {
    gui.destroy()
})
</script>

<template >

</template>
<style >
.lil-gui.autoPlace {
    left: 15px;
    bottom: 0;
    top: auto
}
</style>