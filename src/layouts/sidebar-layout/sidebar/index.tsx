import Avatar from "@/layouts/modules/Avatar.tsx"
import React from "react"
import Push from "@/layouts/modules/Push.tsx"
import Search from "@/layouts/modules/Search.tsx"
import MenuItem from "./modules/MenuItem.tsx"
import { routes } from "@/router"
import { normalizeTo } from "@/utils/utils.ts"
import { useLocation } from "react-router-dom"
import Update from "@/layouts/modules/Update.tsx"

const Sidebar: React.FC = () => {
  const location = useLocation()
  const sidebarRoutes = (routes[0].children || []).filter((r) => !r.handle?.hidden && !r.index)
  const activeVisibleIndex = sidebarRoutes.findIndex((item) => location.pathname === normalizeTo(item.path))

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
