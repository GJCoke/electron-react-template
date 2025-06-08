import { Layout } from "antd"
import Avatar from "../modules/Avatar"
import React, { useState, useEffect } from "react"
import Update from "../modules/Update"
import Help from "../modules/Help"
import Notification from "../modules/Notification"
import Push from "../modules/Push"
import History from "../modules/History"
import Search from "../modules/Search"
import IconButton from "@/layouts/header/modules/IconButton.tsx"

interface Props {
  className?: string
  maximize: () => void
}

const LeftHeader: React.FC<Props> = ({ className, maximize }) => {
  const [isMaximize, setIsMaximize] = useState<boolean>(false)
  const [notMac, setNotMac] = useState<boolean>(false)

  const handelMaximize = async () => {
    window.electronWindow?.toggleMaximize()
    setIsMaximize((prevState) => !prevState)
  }
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
    <Layout.Header className={`${className} drag h-44px lh-normal flex flex-col justify-center p-x select-none`}>
      <div className="flex justify-between items-center" onDoubleClick={maximize}>
        <div className="flex gap-3 justify-center items-center">
          <Avatar />
          <Help />
          <Update />
          <Notification />
        </div>
        <div className="flex gap-4 justify-center items-center w-1/3">
          <History />
          <Search />
          <Push />
        </div>
        <div className="w-100px" />
        {notMac && (
          <div className="absolute top-1 right-1 flex z-100">
            <IconButton icon="qlementine-icons:windows-minimize-16" onClick={handelMinimize} />
            <IconButton
              icon={isMaximize ? "qlementine-icons:windows-unmaximize-16" : "qlementine-icons:windows-maximize-16"}
              onClick={handelMaximize}
            />
            <IconButton icon="qlementine-icons:windows-close-16" onClick={handelClose} />
          </div>
        )}
      </div>
    </Layout.Header>
  )
}

export default LeftHeader
