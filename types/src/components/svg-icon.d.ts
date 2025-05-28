import React, { type CSSProperties } from "react"
interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  icon?: string
  localIcon?: string
  className?: string
  style?: CSSProperties
}
declare const SvgIcon: React.FC<SvgIconProps>
export default SvgIcon
