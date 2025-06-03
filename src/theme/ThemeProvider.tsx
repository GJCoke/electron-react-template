// src/theme/ThemeProvider.tsx
import { ConfigProvider, theme as antdTheme, type ThemeConfig } from "antd"
import React, { createContext, useContext, useState, useMemo, useEffect } from "react"

type ThemeMode = "light" | "dark"

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  themeConfig: ThemeConfig
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light")

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme)
  }

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme")
    setTheme(current === "dark" ? "light" : "dark")
  }, [mode])

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"))

  const themeConfig: ThemeConfig = useMemo(() => {
    return {
      algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      cssVar: true, // 启用 css 变量
      token: {
        borderRadius: 6,
        colorPrimary: "#6c63ff",
        colorInfo: "#6c63ff",
        wireframe: false,
        colorPrimaryBg: "#868a8f80",
      },
    }
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, themeConfig }}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}
