import React, { useEffect, useState } from "react"
import LeftHeader from "./layouts/LeftHeader.tsx"
import RightHeader from "./layouts/RightHeader.tsx"

export type Layout = "left-header" | "right-header"

interface Props {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => {

  const [layout, setLayout] = useState<Layout>("right-header")

  const setSystemLayout = async () => {
    const platform = await window.electronAPI?.platform() ?? 'darwin'
    const isMac = platform === 'darwin'
    setLayout(isMac ? "right-header" : "left-header")
  }

  useEffect(() => {
    setSystemLayout().then()
  }, [])

  const handelToggleMaximize = () => {
    window.electronWindow?.toggleMaximize()
  }

  return (
    layout === "right-header" ? <RightHeader className={className} maximize={handelToggleMaximize} /> : <LeftHeader className={className} maximize={handelToggleMaximize} />
  )
}

export default Header
