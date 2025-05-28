import React, { type CSSProperties, useMemo } from "react"
import { Icon } from "@iconify/react"

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  icon?: string
  localIcon?: string
  className?: string
  style?: CSSProperties
}

const SvgIcon: React.FC<SvgIconProps> = ({ icon, localIcon, className, style, ...rest }) => {
  const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env
  const defaultLocalIcon = "no-icon"

  const symbolId = useMemo(() => {
    const iconName = localIcon || defaultLocalIcon
    return `#${prefix}-${iconName}`
  }, [localIcon, prefix])

  const renderLocalIcon = useMemo(() => {
    return Boolean(localIcon) || !icon
  }, [localIcon, icon])

  if (renderLocalIcon) {
    return (
      <svg aria-hidden="true" width="1em" height="1em" className={className} style={style} {...rest}>
        <use xlinkHref={symbolId} fill="currentColor" />
      </svg>
    )
  }

  // @ts-expect-error ...rest
  return <Icon icon={icon!} className={className} style={style} {...rest} />
}

export default SvgIcon
