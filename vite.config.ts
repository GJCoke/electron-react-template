import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import electron from "vite-plugin-electron/simple"
import renderer from "vite-plugin-electron-renderer"
import UnoCSS from "unocss/vite"
import { fileURLToPath } from "node:url"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "node:path"
import pkg from "./package.json"
import { rmSync } from "node:fs"
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig(({ command, mode }) => {
  rmSync("dist-electron", { recursive: true, force: true })

  const viteEnv = loadEnv(mode, process.cwd())
  const isServe = command === "serve"
  const isBuild = command === "build"
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG
  return {
    plugins: [
      visualizer({ open: false }), // check package chunk size set true run vite build.
      UnoCSS(),
      react(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg-icons")],
        symbolId: `${viteEnv.VITE_ICON_LOCAL_PREFIX}-[name]`,
      }),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: "electron/index.ts",
          onstart(args) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App")
            } else {
              args.startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron",
              rollupOptions: {
                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        renderer: {},
      }),
      renderer(),
    ],
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      open: false,
      host: pkg.env.host,
      port: pkg.env.port,
    },
    build: {
      chunkSizeWarningLimit: 1000
    }
  }
})
