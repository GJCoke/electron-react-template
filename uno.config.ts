import { defineConfig, presetIcons } from "unocss"
import presetWind3 from "@unocss/preset-wind3"

export default defineConfig({
  presets: [
    presetWind3(), // 基础原子类
    presetIcons(), // 图标支持
  ],
  shortcuts: [["btn", "px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"]],
})
