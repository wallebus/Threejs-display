<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import { Color, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Init
const size = {
    width() { return window.innerWidth },
    height() { return window.innerHeight * 0.8 },
    aspect() { return this.width() / this.height() }
}
const canvas = document.querySelector('canvas') || CreateCanvas();
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
const scene = new Scene()
const camera = new PerspectiveCamera(80, size.aspect(), 0.1, 50)
const control = new OrbitControls(camera, canvas)

camera.position.z = 6
renderer.setSize(size.width(), size.height())
renderer.setPixelRatio(Math.min(1, window.devicePixelRatio))

// geometry
const sphere = new Mesh(
    new SphereGeometry(1, 16, 16),
    new MeshBasicMaterial({ color: new Color('red') })
)
const sphere1 = sphere.clone()
const sphere2 = sphere.clone()
const sphereGroup = new Group()

sphere1.position.x = -3
sphere2.position.x = 3
sphereGroup.add(sphere, sphere1, sphere2)

// Raycaster
const raycaster = new Raycaster()
const rayOrigin = new Vector3(-6, 0, 0)
const rayDirection = new Vector3(6, -1, 0)
rayDirection.normalize()
raycaster.set(rayOrigin, rayDirection)

const intersect = raycaster.intersectObject(sphere)
const intersects = raycaster.intersectObjects(sphereGroup.children)
console.log(intersect, intersects);


// render
scene.add(camera, sphereGroup)
animate()

function animate() {
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

// ———— Window adaptive ————
window.addEventListener('resize', () => {
    renderer.setSize(size.width(), size.height())
    camera.aspect = size.aspect()
    camera.updateProjectionMatrix()
})
</script>

<template >

</template>


<style>

</style>
