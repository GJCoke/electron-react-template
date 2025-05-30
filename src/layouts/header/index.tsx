import { Layout } from "antd"
import Avatar from "./modules/Avatar"
import React from "react"
import Update from "./modules/Update"
import Help from "./modules/Help"
import Notification from "./modules/Notification"
import Push from "./modules/Push"
import History from "./modules/History"
import Search from "./modules/Search"

interface Props {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => {

  const handelToggleMaximize = () => {
    window.electronAPI?.toggleMaximize()
  }

  return (
    <Layout.Header className={`${className} title-bar h-44px lh-normal c-white flex flex-col justify-center p-x select-none`}>
      <div className="flex justify-between items-center" onDoubleClick={handelToggleMaximize}>
        <div className="w-100px" />
        <div className="flex gap-4 justify-center items-center w-1/3">
          <History />
          <Search />
          <Push />
        </div>
        <div className="flex gap-3 justify-center items-center">
          <Notification />
          <Update />
          <Help />
          <Avatar />
        </div>
      </div>
    </Layout.Header>
  )
}

export default Header
