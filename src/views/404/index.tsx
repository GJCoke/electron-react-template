import SvgIcon from "@/components/SvgIcon"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import React, { type CSSProperties } from "react"

interface Props {
  className?: string
  style?: CSSProperties
}

const NotFound: React.FC<Props> = ({ className, style }) => {
  const navigate = useNavigate();

  return (
    <div className={`h-full w-full flex items-center justify-center bg-background ${className}`} style={style}>
      <div className="container flex flex-col md:flex-row items-center justify-between px-5">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-primary font-dark font-extrabold mb-8"> 404</div>
          <p className="text-2xl md:text-3xl mb-8 c-title">糟了，你撞到了前端宇宙的边界！</p>
          <p className="text-lg md:text-xl c-subtitle">你正在寻找的页面已经被传送到异次元，或者压根就不存在。</p>
          <p className="text-lg md:text-xl c-subtitle">也许是时空坐标错了？</p>
          <Button type="primary" onClick={() => {navigate("/")}}>回到导航大厅</Button>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2">
          <SvgIcon localIcon="404" className="text-400px xl:text-600px" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
