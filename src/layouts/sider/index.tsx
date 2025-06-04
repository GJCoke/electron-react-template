import React, { type CSSProperties, useEffect, useRef, useState } from "react"
import { Layout, Popover } from "antd"
import MenuItem from "./modules/MenuItem"
import { routes } from "@/router"
import { useLocation, useNavigate } from "react-router-dom"
import SvgIcon from "@/components/SvgIcon"

interface SiderProps {
  className?: string
  style?: CSSProperties
}

const MENU_ITEM_HEIGHT = 56
const MENU_ITEM_GAP = 2

const Sider: React.FC<SiderProps> = ({ className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigate()
  const [maxVisibleItems, setMaxVisibleItems] = useState(0)
  const sidebarRoutes = (routes[0].children || []).filter((r) => !r.handle?.hidden && !r.index)
  const [open, setOpen] = useState(false)

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

  const location = useLocation()

  const normalizeTo = (to?: string) => {
    if (!to) return "/"
    return to.startsWith("/") ? to : `/${to}`
  }

  const activeVisibleIndex = visibleItems.findIndex((item) => location.pathname === normalizeTo(item.path))

  // 判断 overflowItems 中是否有激活的
  const isMoreActive = overflowItems.some((item) => location.pathname === normalizeTo(item.path))

  return (
    <Layout.Sider width="64px" className={`${className} bg-transparent`} style={style} ref={containerRef}>
      <div className={`flex flex-col gap-${MENU_ITEM_GAP}px justify-center items-center`}>
        {visibleItems.map(({ handle: { title, icon }, path }, i) => {
          return (
            <MenuItem
              className={`h-${MENU_ITEM_HEIGHT}px w-56px`}
              title={title}
              icon={icon}
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
                      className={`flex items-center w-140px p-3 gap-3 hover:bg-hover rounded-lg cursor-pointer select-none ${isActive ? "bg-hover c-primary-active" : ""}`}
                      onClick={() => {
                        navigation(item.path || "/")
                        setOpen(false)
                      }}
                    >
                      <SvgIcon icon={item.handle.icon} className="text-22px" />
                      {item.handle.title}
                    </div>
                  )
                })}
              </div>
            }
            open={open}
            onOpenChange={(open) => setOpen(open)}
          >
            <div className="h-56px w-56px flex items-center justify-center cursor-pointer hover:bg-black/20 rounded-lg">
              <MenuItem
                className={`h-${MENU_ITEM_HEIGHT}px w-56px`}
                title="更多"
                icon="hugeicons:more-horizontal-square-01"
                key="more"
                isActive={isMoreActive}
              />
            </div>
          </Popover>
        )}
      </div>
    </Layout.Sider>
  )
}

export default Sider
