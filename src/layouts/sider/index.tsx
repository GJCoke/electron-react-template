import React, { type CSSProperties } from "react"
import { Layout } from "antd"
import MenuItem from "./modules/MenuItem"

interface SiderProps {
  className?: string
  style?: CSSProperties
}

const Sider: React.FC<SiderProps> = ({ className, style }) => {
  const MenuList = [
    {
      title: "消息",
      icon: "hugeicons:message-notification-01",
    },
    {
      title: "视频",
      icon: "hugeicons:video-01",
    },
    {
      title: "日历",
      icon: "hugeicons:calendar-02",
    },
    {
      title: "文档",
      icon: "hugeicons:file-01",
    },
    {
      title: "通讯录",
      icon: "hugeicons:user-multiple-02",
    },
    {
      title: "任务",
      icon: "hugeicons:task-daily-01",
    },
  ]

  return (
    <Layout.Sider width="64px" className={`${className} bg-transparent`} style={style}>
      <div className="flex flex-col gap-3 justify-center items-center">
        {MenuList.map(({ title, icon }, i) => (
          <MenuItem title={title} icon={icon} key={i} />
        ))}
      </div>
    </Layout.Sider>
  )
}

export default Sider
