import { onMounted, onUnmounted } from "vue";
import Stats from "stats.js";

export default function InitStats() {
  const stats = new Stats();

  onMounted(() => {
    document.querySelector("#app")?.appendChild(stats.dom);
    stats.update();
  });
  onUnmounted(() => {
    stats.dom.parentNode?.removeChild(stats.dom);
  });

  return stats;
}
