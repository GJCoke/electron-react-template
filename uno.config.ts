import { defineConfig, presetAttributify, presetIcons } from "unocss"
import presetWind3 from "@unocss/preset-wind3"

export default defineConfig({
  presets: [
    presetWind3({
      dark: "class",
    }), // 基础原子类
    presetAttributify(), // 支持属性模式
    presetIcons(), // 图标支持
  ],
  shortcuts: [
    ["btn", "px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"],
    ["surface", "[background:var(--color-surface-bg)]"],
    ["drag", "[-webkit-app-region:drag]"],
    ["not-drag", "[-webkit-app-region:no-drag]"],
  ],
  theme: {
    colors: {
      // primary: "var(--primary-color)",
      background: "var(--color-bg)",
      text: "var(--color-text-content",
      surface: "var(--color-surface-bg)",
      textSurface: "var(--color-text-primary)",
      primary: "var(--color-primary)",
      primaryActive: "var(--color-primary-active)",
      primaryHover: "var(--color-primary-hover)",
      title: "var(--color-text-title)",
      subtitle: "var(--color-text-subtitle)",
      body: "var(--color-text-body)",
      muted: "var(--color-text-muted)",
      link: "var(--color-text-link)",
      linkHover: "var(--color-text-link-hover)",
      error: "var(--color-text-error)",
      hover: "var(--color-hover)",
    },
  },
})
