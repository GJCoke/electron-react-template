import { Avatar as AntdAvatar } from "antd"

const Avatar = () => {
  return (
    <div
      className="not-drag cursor-pointer"
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <AntdAvatar size={28} className="bg-green">Coke</AntdAvatar>
    </div>
  )
}

export default Avatar
