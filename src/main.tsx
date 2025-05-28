import React from "react"
import ReactDOM from "react-dom/client"
import 'virtual:svg-icons-register';
import App from "./App.tsx"
import "uno.css"
import "./index.css"

console.log(window.electronAPI?.ping())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
