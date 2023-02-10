<script lang="ts" setup>
import { CreateCanvas } from '@/units/CreateCanvas';
import { AxesHelper, Clock, Color, Group, Material, Mesh, MeshBasicMaterial, Object3D, ObjectLoader, PerspectiveCamera, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Init
const size = {
    width: window.innerWidth,
    height: window.innerHeight * 0.8,
    aspect() { return this.width / this.height }
}
const canvas = document.querySelector('canvas') || CreateCanvas();
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
const scene = new Scene()
const camera = new PerspectiveCamera(80, size.aspect(), 0.1, 50)
const control = new OrbitControls(camera, canvas)

camera.position.z = 7
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(1, window.devicePixelRatio))

// geometry
const helper = new AxesHelper(3)
const spheres = createSpheres(3)

spheres[0].position.x = -3
spheres[2].position.x = 3
spheres.map(sphere => {
    scene.add(sphere)
})

// Raycaster
const raycaster = new Raycaster()
const rayOrigin = new Vector3(-6, 0, 0)
const rayDirection = new Vector3(6, 0, 0)
rayDirection.normalize()
// raycaster.set(rayOrigin, rayDirection)

const mouse = new Vector2()
canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.offsetX / size.width * 2 - 1
    mouse.y = -e.offsetY / size.height * 2 + 1
})

let currentObject: Object3D | null

// render
scene.add(camera, helper)
const clock = new Clock()
tick()

canvas.addEventListener('click', () => {
    if (currentObject) {
        console.log(currentObject)
        currentObject = null
    }
})

function tick() {
    animation()
    raycasterChange()
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}

function animation() {
    const time = clock.getElapsedTime()
    spheres[0].position.y = Math.sin(time * 0.3) * 2
    spheres[1].position.y = Math.sin(time * 0.8) * 2
    spheres[2].position.y = Math.sin(time * 1.4) * 2
}

function raycasterChange() {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(spheres)

    intersects.map(intersect => {
        // (intersect.object.material).color.set('#000fff')

    })

    spheres.map(sphere => {
        if (!intersects.find(intersect => intersect.object === sphere)) {
            sphere.material.color.set('#ff0000')
        }
    })
}

function createSpheres(count: number) {

    const spheres = []
    for (; count > 0; count--) {
        let a = new Mesh(
            new SphereGeometry(1, 16, 16),
            new MeshBasicMaterial({ color: new Color('red') })
        )
        spheres.push(a)
    }
    return spheres
}

window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight * 0.8
    renderer.setSize(size.width, size.height)
    camera.aspect = size.aspect()
    camera.updateProjectionMatrix()
})
</script>

<template >

</template>


<style>

</style>
