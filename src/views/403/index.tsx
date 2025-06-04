import SvgIcon from "@/components/SvgIcon"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import React, { type CSSProperties } from "react"

interface Props {
  className?: string
  style?: CSSProperties
}

const Forbidden: React.FC<Props> = ({ className, style }) => {
  const navigate = useNavigate()

  return (
    <div className={`h-full w-full flex items-center justify-center bg-background ${className}`} style={style}>
      <div className="container flex flex-col md:flex-row items-center justify-between px-5">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-primary font-dark font-extrabold mb-8"> 403</div>
          <p className="text-2xl md:text-3xl mb-8 c-title">糟了，这片区域被权限力场封锁了！</p>
          <p className="text-lg md:text-xl c-subtitle">你试图进入一个你还没有权限访问的前端禁区。</p>
          <p className="text-lg md:text-xl c-subtitle">再等等，或者找个宇宙管理员开个权限口子？</p>
          <Button
            type="primary"
            onClick={() => {
              navigate("/")
            }}
          >
            回到安全宇宙
          </Button>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2">
          <SvgIcon localIcon="403" className="text-400px xl:text-600px" />
        </div>
      </div>
    </div>
  )
}

export default Forbidden
