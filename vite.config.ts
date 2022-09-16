import { resolve } from "path";
import { defineConfig } from "vite";
// console.log(__dirname, resolve(__dirname, "src"));
export default defineConfig({
	server: {},
	build: { target: "esnext" },
	resolve: { alias: { $: resolve("./src") } },
	esbuild: {},
});
