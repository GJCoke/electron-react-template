import React from "react"
import ReactDOM from "react-dom/client"
import "virtual:svg-icons-register"
import App from "./App.tsx"
import "uno.css"
import "./index.css"
import { ConfigProvider } from "antd"

async function test() {
  const c1 = await window.electronAPI?.ping()
  console.log(c1)
}
test()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={{ cssVar: true }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
