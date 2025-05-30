import { useEffect } from "react"
import Layouts from "./layouts"

function App() {
  useEffect(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  }, [])

  return (
    <>
      <div>
        <Layouts />
      </div>
    </>
  )
}

export default App
