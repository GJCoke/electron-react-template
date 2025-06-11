import React, { type CSSProperties } from "react"
import SvgIcon from "@/components/SvgIcon.tsx"
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
      className={`${className} rounded-lg flex flex-col items-center justify-center hover:bg-hover hover:c-primary-active cursor-pointer select-none ${isActive ? "bg-hover c-primary-active" : ""}`}
      style={style}
      onClick={() => {
        to && navigation(to)
      }}
    >
      <div>
        <SvgIcon className="text-22px" icon={icon} localIcon={localIcon} />
      </div>
      <div className="text-10px font-black">{title}</div>
    </div>
  )
}

export default MenuItem
