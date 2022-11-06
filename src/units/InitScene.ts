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
  const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(Size.width, Size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
  camera.matrixAutoUpdate = true;

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
    });
  };

  let doubleClick = () =>
    canvas.addEventListener("dblclick", () => {
      // webkit 适配Safari on iphone
      const FullScreen = document.fullscreenElement;

      if (!FullScreen) {
        canvas.requestFullscreen;
        canvas.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  scene.add(cube, camera);

  // 动画函数
  const tick = () => {
    cube.updateMatrix();
    controls.update();
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
    canvas,
  };

  return initScene;
}

// 重构
class InitWorld {
  public Canvas;
  public Aspect;
  public Object3D;
  constructor(Width: number, Height: number, Object3D: Object3D) {
    this.Canvas = this.CreateCanvas();
    this.Aspect = Width / Height;
    this.Object3D = Object3D || this.createBox;
  }
  CreateCanvas() {
    const canvas = document.createElement("canvas");
    const body = document.querySelector("body");
    body?.append(canvas);
    return canvas;
  }
  removeCanvas() {
    this.Canvas.remove();
  }
  createRenderer(Canvas: HTMLCanvasElement) {
    let renderer = new WebGLRenderer({ canvas: Canvas });
    return renderer;
  }
  createScene() {
    return new Scene();
  }
  createCamera() {
    let perspective = new PerspectiveCamera();
    let orthoGraphic = new OrthographicCamera();
    let Cameras = { perspective, orthoGraphic };
    return Cameras;
  }
  createBox() {
    let geometry = new BoxGeometry(2, 2, 2);
    let material = new MeshBasicMaterial({ color: new Color("blue") });
    let cube = new Mesh(geometry, material);
    return cube;
  }
  createWorld() {
    let renderer = this.createRenderer(this.Canvas);
    let Cameras = this.createCamera();
    let scene = this.createScene();
    let camera = Cameras.perspective;
    scene.add(this.Object3D, camera);
    renderer.render(scene, camera);

    const world = {};
  }
  // resize() {
  //   window.addEventListener("resize", () => {
  //     aspect = Size.width / Size.height;
  //     perSpective.aspect = aspect;
  //     orthoGraphic.left = -3 * aspect;
  //     orthoGraphic.right = 3 * aspect;
  //     camera.updateProjectionMatrix();

  //     renderer.setSize(Size.width, Size.height);
  //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //   });
  // }
}
