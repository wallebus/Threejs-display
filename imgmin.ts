import imagemin from "imagemin";
import imageminOptipng from "imagemin-optipng";

(async () => {
  await imagemin(["./public/assets/**/*.jpg"], {
    destination: "build/images",
    plugins: [imageminOptipng()],
  });

  console.log("Images optimized!");
})();
