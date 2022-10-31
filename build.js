import esbuild from "esbuild";
import copy from "esbuild-copy-files-plugin";

esbuild
	.build({
		external: ["alt", "alt-server", "alt-client", "alt-shared", "natives"],

		entryPoints: ["projects/indicators/server/main.ts", "projects/indicators/client/main.ts"],
		outdir: "resources/indicators",

		bundle: true,
		minify: true,
	
		target: "es2022",
		platform: "node",

		format: "esm",
		tsconfig: "./tsconfig.json",

		plugins: [
			copy({
				source: ["./projects/indicators/resource.cfg"],
				target: "./resources/indicators",
				copyWithFolder: true
			})
		]
	});
