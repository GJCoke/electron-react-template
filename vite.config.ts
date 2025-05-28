import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import electron from "vite-plugin-electron"
import renderer from "vite-plugin-electron-renderer"
import UnoCSS from "unocss/vite"
import { fileURLToPath } from "node:url"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "node:path"

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
          entry: "electron/main.ts",
        },
        {
          entry: "electron/preload.ts",
          onstart: (options) => {
            options.reload()
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
  }
})
