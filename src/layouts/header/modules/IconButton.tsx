import SvgIcon from "@/components/SvgIcon"
import React, { type CSSProperties } from "react"

export interface IconButtonProps {
  icon: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className, style, onClick }) => {
  return (
    <div
      className={`cursor-pointer not-drag w-30px h-30px hover:bg-gray-200/30 flex items-center justify-center rounded-md ${className}`}
      style={style}
      onDoubleClick={(e) => e.stopPropagation()}
      onClick={onClick}
    >
      {/* no message: line-md:bell-loop */}
      <SvgIcon className="text-20px" icon={icon} />
    </div>
  )
}

export default IconButton
