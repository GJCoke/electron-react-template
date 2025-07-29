import React, { type CSSProperties, useEffect, useRef, useState } from "react"
import { Popover } from "antd"
import MenuItem from "./modules/MenuItem"
import { useNavigate } from "react-router-dom"
import SvgIcon from "@/components/SvgIcon"
import { normalizeTo } from "@/utils/utils"
import { useSidebarRoutes } from "@/hooks/useSidebar"

interface SidebarProps {
  className?: string
  style?: CSSProperties
}

const MENU_ITEM_HEIGHT = 56
const MENU_ITEM_GAP = 4

const Sidebar: React.FC<SidebarProps> = ({ className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigate()
  const [maxVisibleItems, setMaxVisibleItems] = useState(0)
  const [open, setOpen] = useState(false)
  const { activeVisibleIndex, currentBindPath, location, sidebarRoutes } = useSidebarRoutes()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const resize = () => {
      const height = el.clientHeight
      const count = Math.floor(height / (MENU_ITEM_HEIGHT + MENU_ITEM_GAP))
      setMaxVisibleItems(count > 1 ? count - 2 : count)
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const visibleItems = sidebarRoutes.slice(0, maxVisibleItems)
  const overflowItems = sidebarRoutes.slice(maxVisibleItems)

  const isMoreActive = overflowItems.some(
    (item) => normalizeTo(item.path) === location.pathname || normalizeTo(item.path) === currentBindPath
  )

  return (
    <div className={`${className} w-16 h-full`} style={style} ref={containerRef}>
      <div className="flex flex-col justify-center items-center" style={{ gap: MENU_ITEM_GAP }}>
        {visibleItems.map(({ handle: { title, icon, localIcon }, path }, i) => {
          return (
            <MenuItem
              className="w-14"
              style={{ height: MENU_ITEM_HEIGHT }}
              title={title}
              icon={icon}
              localIcon={localIcon}
              key={i}
              to={path}
              isActive={i === activeVisibleIndex}
            />
          )
        })}

        {overflowItems.length > 0 && (
          <Popover
            rootClassName="custom-popover"
            placement="right"
            trigger="click"
            content={
              <div className="flex flex-col gap-1">
                {overflowItems.map((item, i) => {
                  const isActive = location.pathname === normalizeTo(item.path)
                  return (
                    <div
                      key={i}
                      className={`flex items-center w-140px p-3 gap-3 hover:bg-hover rounded-lg cursor-pointer select-none ${isActive ? "bg-hover c-theme-primary-active" : ""}`}
                      onClick={() => {
                        navigation(item.path || "/")
                        setOpen(false)
                      }}
                    >
                      <SvgIcon localIcon={item.handle.localIcon} icon={item.handle.icon} className="text-20px" />
                      {item.handle.title}
                    </div>
                  )
                })}
              </div>
            }
            open={open}
            onOpenChange={(open) => setOpen(open)}
          >
            <div className="h-14 w-14 flex items-center justify-center cursor-pointer hover:bg-black/20 rounded-lg">
              <MenuItem
                className="w-14"
                style={{ height: MENU_ITEM_HEIGHT }}
                title="更多"
                icon="hugeicons:more-horizontal-square-01"
                key="more"
                isActive={isMoreActive}
              />
            </div>
          </Popover>
        )}
      </div>
    </div>
  )
}

export default Sidebar
