import { Layout } from "antd"
import Avatar from "@/layouts/modules/Avatar.tsx"
import React from "react"
import Update from "@/layouts/modules/Update.tsx"
import Help from "@/layouts/modules/Help.tsx"
import Notification from "@/layouts/modules/Notification.tsx"
import Push from "@/layouts/modules/Push.tsx"
import History from "@/layouts/modules/History.tsx"
import Search from "@/layouts/modules/Search.tsx"

interface Props {
  className?: string
}

const RightHeader: React.FC<Props> = ({ className }) => {
  return (
    <Layout.Header className={`${className} drag h-11 lh-normal flex flex-col justify-center p-x select-none`}>
      <div className="flex justify-between items-center">
        <div className="w-100px" />
        <div className="flex gap-4 justify-center items-center w-1/3">
          <History />
          <Search className="w-full" />
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

export default RightHeader
