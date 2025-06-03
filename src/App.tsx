import { useEffect } from "react"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { routes } from "@/router"

const AppRoutes = () => {
  return useRoutes(routes);  // 这里不要用 Suspense 包裹
}

function App() {
  useEffect(() => {
    postMessage({ payload: "removeLoading" }, "*")
  }, [])

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
