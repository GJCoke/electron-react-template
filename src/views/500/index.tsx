import SvgIcon from "@/components/SvgIcon"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import React, { type CSSProperties } from "react"

interface Props {
  className?: string
  style?: CSSProperties
}

const ServerError: React.FC<Props> = ({ className, style }) => {
  const navigate = useNavigate()

  return (
    <div className={`h-full w-full flex items-center justify-center bg-background ${className}`} style={style}>
      <div className="container flex flex-col md:flex-row items-center justify-between px-5">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-primary font-dark font-extrabold mb-8"> 500</div>
          <p className="text-2xl md:text-3xl mb-8 c-title">哎呀，前端引擎舱爆炸了！</p>
          <p className="text-lg md:text-xl c-subtitle">服务器刚才打了个喷嚏，一切都乱了套。</p>
          <p className="text-lg md:text-xl c-subtitle">我们派工程师上太空船修理去了，请稍等片刻。</p>
          <Button
            type="primary"
            onClick={() => {
              navigate("/")
            }}
          >
            尝试重新发射页面
          </Button>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2">
          <SvgIcon localIcon="500" className="text-400px xl:text-600px" />
        </div>
      </div>
    </div>
  )
}

export default ServerError
