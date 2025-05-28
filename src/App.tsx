import "./App.css"
import { Icon } from "@iconify/react"
import SvgIcon from "./components/svg-icon"

function App() {
  return (
    <>
      <div>
        <Icon icon="hugeicons:account-setting-01" width="24" height="24" />
        <SvgIcon icon="hugeicons:account-setting-01" localIcon="no-icon" />
        <a>测试文件111</a>
      </div>
    </>
  )
}

export default App
