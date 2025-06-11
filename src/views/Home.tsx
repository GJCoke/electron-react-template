import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    window.electronLogger?.info("Welcome Home Page")
  }, [])

  return (<div>
    {
      Array.from({ length: 1000 }).map((_, index) => <div key={index}>首页</div>)
    }
  </div>)
}

export default Home
