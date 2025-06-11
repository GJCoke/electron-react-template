import React from "react"
import SvgIcon from "@/components/SvgIcon.tsx"
import { useNavigate } from "react-router-dom"

const SettingHeader: React.FC = () => {
  const navigation = useNavigate()

  const handelGoBack = () => {
    navigation(-1)
  }

  return (
    <div className="flex justify-between items-center text-24px border-b-1 border-b-gray-400 border-b-solid h-12 pl-6 pr-6 p-2">
      <div>设置</div>
      <SvgIcon className="cursor-pointer" icon="hugeicons:cancel-01" onClick={handelGoBack} />
    </div>
  )
}

export default SettingHeader
