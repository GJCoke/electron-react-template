import Avatar from "@/layouts/modules/Avatar"
import React from "react"
import Push from "@/layouts/modules/Push"
import Search from "@/layouts/modules/Search"
import MenuItem from "./modules/MenuItem"
import Update from "@/layouts/modules/Update"
import { useSidebarRoutes } from "@/hooks/useSidebar"

const Sidebar: React.FC = () => {
  const { sidebarRoutes, activeVisibleIndex } = useSidebarRoutes()

  return (
    <div className="flex flex-col gap-2 p-2 h-full">
      <div className="flex justify-between h-10 items-center">
        <Avatar />
        <Push />
      </div>
      <div>
        <Search className="!justify-start" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {sidebarRoutes.map(({ handle: { title, icon, localIcon }, path }, i) => {
          return (
            <MenuItem
              title={title}
              icon={icon}
              localIcon={localIcon}
              key={i}
              to={path}
              isActive={i === activeVisibleIndex}
            />
          )
        })}
      </div>
      <div className="mb-4">
        <Update model="horizontal" />
      </div>
    </div>
  )
}

export default Sidebar
