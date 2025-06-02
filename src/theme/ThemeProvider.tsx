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

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"))

  const themeConfig: ThemeConfig = useMemo(() => {
    return {
      algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      cssVar: true, // 启用 css 变量
      token: {
        borderRadius: 6,
      },
    }
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, themeConfig }}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}
