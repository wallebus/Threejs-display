import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  onChanged(dark: boolean) {
    const body = document.querySelector("body");
    body?.classList.toggle("dark");
  },
});

export const toggleDark = useToggle(isDark);
