import React, { type CSSProperties } from "react"
import { Radio } from "antd"

export interface ThemeCardProps {
  className?: string
  style?: CSSProperties
  active: boolean
  value: string
  label: string
  children?: React.ReactNode
  onClick?: () => void
}

const RadioCard: React.FC<ThemeCardProps> = ({ className, style, active, value, label, children, onClick }) => {
  return (
    <div
      className={`w-64 h-38 rounded-md flex flex-col cursor-pointer ${className} border-solid border-1 border-border`}
      style={style}
      onClick={onClick}
    >
      {children}
      <div className={`border-t-solid border-t-border border-t-1 p-2 rounded-b-md ${active ? "bg-active" : ""}`}>
        <Radio value={value}>{label}</Radio>
      </div>
    </div>
  )
}

export default RadioCard
