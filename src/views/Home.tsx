import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    window.electronLogger?.info("Welcome Home Page")
  }, [])

  return <div>首页</div>
}

export default Home
