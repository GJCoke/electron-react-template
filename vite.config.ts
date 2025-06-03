import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import electron from "vite-plugin-electron"
import renderer from "vite-plugin-electron-renderer"
import UnoCSS from "unocss/vite"
import { fileURLToPath } from "node:url"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "node:path"
import pkg from "./package.json"

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())
  return {
    plugins: [
      UnoCSS(),
      react(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg-icons")],
        symbolId: `${viteEnv.VITE_ICON_LOCAL_PREFIX}-[name]`,
      }),
      electron([
        {
          entry: "electron/main/index.ts",
          vite: {
            build: {
              outDir: "dist-electron/main",
              rollupOptions: {
                output: {
                  entryFileNames: "index.js",
                },
              },
            },
          },
        },
        {
          entry: "electron/preload/index.ts",
          vite: {
            build: {
              outDir: "dist-electron/preload",
              rollupOptions: {
                output: {
                  entryFileNames: "index.js",
                },
              },
            },
          },
        },
      ]),
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
    }
  }
})
