import { createContext, useContext } from "react"
import type { ThemeConfig } from "antd"

export type ThemeMode = "light" | "dark"

export interface ThemeContextType {
  mode: ThemeMode
  setTheme: (mode: ThemeMode) => void
  themeConfig: ThemeConfig
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
