import React from "react"
import ReactDOM from "react-dom/client"
import "virtual:svg-icons-register"
import App from "./App.tsx"
import "uno.css"
import "./styles/index.css"
import { ThemeProvider } from "./theme/ThemeProvider"
import "@ant-design/v5-patch-for-react-19"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
