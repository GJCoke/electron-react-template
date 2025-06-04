import { ConfigProvider, theme as antdTheme, type ThemeConfig } from "antd"
import React, { createContext, useContext, useState, useMemo, useEffect } from "react"

type ThemeMode = "light" | "dark"

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  themeConfig: ThemeConfig
}
const THEME_STORAGE_KEY = "theme-mode"
const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialTheme = (): ThemeMode => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    if (stored === "light" || stored === "dark") {
      return stored
    }

    // 没有存储记录：自动判断系统主题
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    return systemDark ? "dark" : "light"
  }

  const [mode, setMode] = useState<ThemeMode>(() => {
    const theme = getInitialTheme()
    document.documentElement.setAttribute("data-theme", theme)
    return theme
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode)
    localStorage.setItem(THEME_STORAGE_KEY, mode)
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
        colorSuccess: "#00c9a7",
      },
    }
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, themeConfig }}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}
