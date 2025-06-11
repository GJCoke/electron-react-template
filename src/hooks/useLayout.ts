import { createContext, useContext } from "react"

export type LayoutType = "default" | "sidebar"

interface LayoutContextProps {
  layout: LayoutType
  setLayout: (layout: LayoutType) => void
}

export const LayoutContext = createContext<LayoutContextProps | null>(null)

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
