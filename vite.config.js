import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      input: {
        header_scripts: resolve(__dirname, "src/js/header/index.js"),
        footer_scripts: resolve(__dirname, "src/js/footer/index.js"),
        styles: resolve(__dirname, "src/css/index.css"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "styles.css") {
            return "css/[name].min.css";
          }
          return "js/[name].min.js";
        },
        dir: "dist",
        entryFileNames: (assetInfo) => {
          return "js/[name].min.js";
        },
      },
    },
  },
});
