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
          <div className="text-7xl text-#6c63ff font-dark font-extrabold mb-8">403</div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">糟了，这片区域被权限力场封锁了！</p>
          <div>你试图进入一个你还没有权限访问的前端禁区。</div>
          <div>再等等，或者找个宇宙管理员开个权限口子？</div>
          <Button type="primary">回到安全宇宙</Button>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <SvgIcon localIcon="403" className="text-400px" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
