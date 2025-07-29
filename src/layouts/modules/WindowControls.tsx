import IconButton from "@/layouts/modules/IconButton"
import React, { type CSSProperties, useEffect, useState } from "react"

export interface WindowControlsProps {
  className?: string
  style?: CSSProperties
}

const WindowControls: React.FC<WindowControlsProps> = ({ className, style }) => {
  const [notMac, setNotMac] = useState<boolean>(false)

  const [isMaximize, setIsMaximize] = useState<boolean>(false)

  window.electronWindow?.onMaximize(() => setIsMaximize(true))
  window.electronWindow?.onUnmaximize(() => setIsMaximize(false))

  const handelMaximize = async () => window.electronWindow?.toggleMaximize()
  const handelMinimize = () => window.electronWindow?.minimize()
  const handelClose = () => window.electronWindow?.close()

  const setWindowIsMaximized = async () => {
    const maximize = (await window.electronWindow?.isMaximized()) ?? false
    setIsMaximize(maximize)
  }

  const setSystem = async () => {
    const platform = (await window.electronAPI?.platform()) ?? "darwin"
    setNotMac(platform !== "darwin")
  }

  useEffect(() => {
    setWindowIsMaximized().then()
    setSystem().then()
  }, [])

  return (
    notMac && (
      <div className={`absolute top-1 right-1 flex z-100 ${className}`} style={style}>
        <IconButton icon="qlementine-icons:windows-minimize-16" onClick={handelMinimize} />
        <IconButton
          icon={isMaximize ? "qlementine-icons:windows-unmaximize-16" : "qlementine-icons:windows-maximize-16"}
          onClick={handelMaximize}
        />
        <IconButton icon="qlementine-icons:windows-close-16" onClick={handelClose} />
      </div>
    )
  )
}

export default WindowControls
