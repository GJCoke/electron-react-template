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
          <div className="text-7xl text-#6c63ff font-dark font-extrabold mb-8">500</div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">哎呀，前端引擎舱爆炸了！</p>
          <div>服务器刚才打了个喷嚏，一切都乱了套。</div>
          <div>我们派工程师上太空船修理去了，请稍等片刻。</div>
          <Button type="primary">尝试重新发射页面</Button>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <SvgIcon localIcon="500" className="text-400px" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
