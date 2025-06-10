import React, { useState, useMemo, useEffect } from "react"
import { ConfigProvider, theme as antdTheme } from "antd"
import { ThemeContext, type ThemeMode, type ThemeContextType } from "@/hooks/useTheme"

const THEME_STORAGE_KEY = "theme-mode"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialTheme = (): ThemeMode => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    if (stored === "light" || stored === "dark") return stored

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
    const rootStyles = window.getComputedStyle(document.documentElement);
    const cssPrimaryValue = rootStyles.getPropertyValue('--color-primary').trim();
    const cssBackgroundValue = rootStyles.getPropertyValue('--color-bg').trim();
    window.electronStore?.themeSet("primaryColor", cssPrimaryValue).then()
    window.electronStore?.themeSet("backgroundColor", cssBackgroundValue).then()
  }, [mode])

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"))

  const themeConfig: ThemeContextType["themeConfig"] = useMemo(() => {
    return {
      algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      cssVar: true,
      token: {
        borderRadius: 6,
        colorPrimary: "#6c63ff",
        colorInfo: "#6c63ff",
        wireframe: false,
        colorPrimaryBg: "#868a8f80",
        colorSuccess: "#00c9a7",
      },
      components: {
        Button: {
          algorithm: true,
        },
      },
    }
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, themeConfig }}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}
