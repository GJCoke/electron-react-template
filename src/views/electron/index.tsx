import React, { useState } from "react"
import { Input } from "antd"

const Electron: React.FC = () => {
  const [value, setValue] = useState("")

  const set = async (value: string) => {
    const key = "electronStore"
    await window.electronStore?.set("electronStore", value)
    await get(key)
  }

  const get = async (key: string) => {
    const storeValue = await window.electronStore?.get(key)
    setValue(storeValue)
  }

  const handelChangeInput = async (value: string) => {
    await set(value)
  }
  return (
    <div>
      Electron
      <Input onChange={(e) => handelChangeInput(e.target.value)} />
      <div>{value}</div>
    </div>
  )
}

export default Electron
