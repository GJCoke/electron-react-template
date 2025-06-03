import React, { type CSSProperties } from "react"
import SvgIcon from "@/components/SvgIcon"

interface MenuItemProps {
  className?: string
  style?: CSSProperties
  title: string
  icon: string
}

const MenuItem: React.FC<MenuItemProps> = ({ className, style, title, icon }) => {
  return (
    <div
      className={`${className} h-54px w-54px rounded-lg flex flex-col items-center justify-center hover:bg-black/30 cursor-pointer`}
      style={style}
    >
      <div>
        <SvgIcon className="text-22px" icon={icon} />
      </div>
      <div className="text-10px font-bold">{title}</div>
    </div>
  )
}

export default MenuItem
