import React from "react"
import DefaultLayout from "./base-layout"
import CompactLayout from "./sidebar-layout"
import { useLayout } from "@/hooks/useLayout"

const Layouts: React.FC = () => {
  const { layout } = useLayout()

  switch (layout) {
    case "sidebar":
      return <CompactLayout />
    case "default":
    default:
      return <DefaultLayout />
  }
}

export default Layouts
