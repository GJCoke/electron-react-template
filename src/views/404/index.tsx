import SvgIcon from "@/components/SvgIcon"
import { Button } from "antd"

const NotFound = () => {
  return (
    // <div>
    //   <SvgIcon localIcon="404" className="text-400px" />
    // </div>
    <div className="h-screen w-screen bg-gray-50 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-#6c63ff font-dark font-extrabold mb-8"> 404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">糟了，你撞到了前端宇宙的边界！</p>
          <div>你正在寻找的页面已经被传送到异次元，或者压根就不存在。</div>
          <div>也许是时空坐标错了？</div>
          <Button type="primary">回到导航大厅</Button>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <SvgIcon localIcon="404" className="text-400px" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
