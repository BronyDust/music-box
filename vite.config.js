import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { string } from "rollup-plugin-string";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    solidPlugin(),
    solidSvg(),
    string({
			include: '**/*.glsl'
		})
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
