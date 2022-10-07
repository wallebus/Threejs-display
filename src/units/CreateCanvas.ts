import { onBeforeUnmount } from "vue";

function CreateCanvas() {
  const canvas = document.createElement("canvas");
  // canvas.style.width = "80vw";
  // canvas.style.height = "80vh";
  const body = document.querySelector("body");
  body?.append(canvas);
  // }
  onBeforeUnmount(() => {
    canvas.remove();
  });

  return canvas;
}

export { CreateCanvas };
