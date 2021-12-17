import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { string } from "rollup-plugin-string";

export default defineConfig({
  plugins: [
    solidPlugin(),
    string({
			include: '**/*.glsl'
		})
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
