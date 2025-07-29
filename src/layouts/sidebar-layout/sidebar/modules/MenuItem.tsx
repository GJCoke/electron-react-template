import React, { type CSSProperties } from "react"
import SvgIcon from "@/components/SvgIcon"
import { useNavigate } from "react-router-dom"

interface MenuItemProps {
  className?: string
  style?: CSSProperties
  title: string
  icon: string
  localIcon?: string
  to?: string
  isActive?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ className, style, title, icon, localIcon, to, isActive }) => {
  const navigation = useNavigate()

  return (
    <div
      className={`${className} rounded-md flex items-center gap-2 p-1 hover:bg-hover hover:c-primary-active cursor-pointer select-none ${isActive ? "bg-hover c-primary-active" : ""}`}
      style={style}
      onClick={() => {
        to && navigation(to)
      }}
    >
      <SvgIcon className="text-20px" icon={icon} localIcon={localIcon} />
      <div className="font-bold">{title}</div>
    </div>
  )
}

export default MenuItem
