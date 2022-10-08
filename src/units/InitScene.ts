// import {onMounted, ref} from"vue"
import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { CreateCanvas } from "./CreateCanvas";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from "vue";
// import { watch } from "vue";

export function initScene() {
  const scene = new Scene();

  const Size = {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
  };
  const canvas = CreateCanvas();
  const renderer = new WebGLRenderer({ canvas: canvas });
  renderer.setSize(Size.width, Size.height);

  let aspect = Size.width / Size.height;

  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshBasicMaterial({ color: new Color("red") });
  const cube = new Mesh(geometry, material);

  const perSpective = new PerspectiveCamera(75, aspect, 0.1, 20);
  // 正交投影 通过定义四个锥面确定可视空间
  const orthoGraphic = new OrthographicCamera(
    -3 * aspect,
    3 * aspect,
    3,
    -3,
    0.1,
    100
  );

  // 副作用函数
  let camera: PerspectiveCamera | OrthographicCamera;

  const Cameras = {
    perSpective: perSpective,
    orthoGraphic: orthoGraphic,
  };

  camera = Cameras.perSpective;
  camera.position.z = 5;
  camera.lookAt(cube.position);

  let controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // watch the window resize
  let resize = () => {
    window.addEventListener("resize", () => {
      Size.width = window.innerWidth * 0.8;
      Size.height = window.innerHeight * 0.8;
      // console.log(aspect);
      aspect = Size.width / Size.height;
      perSpective.aspect = aspect;
      orthoGraphic.left = -3 * aspect;
      orthoGraphic.right = 3 * aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(Size.width, Size.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  };

  let doubleClick = () =>
    window.addEventListener("dblclick", () => {
      // webkit 适配Safari on iphone
      const FullScreen =
        document.fullscreenElement || document.webkitFullscreenElement;

      if (!FullScreen) {
        canvas.requestFullscreen
          ? canvas.requestFullscreen()
          : canvas.webkitRequestFullscreen();
      } else {
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.webkitExitFullscreen();
      }
    });
  scene.add(cube, camera);

  const tick = () => {
    controls.update();
    // cube.rotation.y = clock.getElapsedTime();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  };
  onMounted(() => {
    resize();
    doubleClick();
  });

  const initScene = {
    scene: scene,
    object: cube,
    camera: camera,
    Cameras: Cameras,
    renderer: renderer,
    controls: controls,
    material: material,
    geometry: geometry,
    animation: tick,
  };

  return initScene;
}
