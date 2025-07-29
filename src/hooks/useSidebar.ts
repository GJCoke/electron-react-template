import { useEffect, useMemo, useState } from "react"
import { useLocation, matchRoutes } from "react-router-dom"
import { routes } from "@/router"
import { normalizeTo } from "@/utils/utils"

export const useSidebarRoutes = () => {
  const location = useLocation()
  const [activeVisibleIndex, setActiveVisibleIndex] = useState<number>()

  const sidebarRoutes = useMemo(() => {
    return (routes[0].children || []).filter((r) => {
      const isHidden = r.handle?.hidden
      const isIndex = r.index
      const isDebug = r.handle?.debug
      const isProd = import.meta.env.VITE_PACKAGE_ENV === "production"
      return !(isHidden || isIndex || (isProd && isDebug))
    })
  }, [])

  const currentBindPath = matchRoutes(routes, location)?.find((m) => m.route.handle?.bind)?.route.handle?.bind

  useEffect(() => {
    const children = routes[0].children || []

    const currentIndex = children.findIndex((item) => {
      return normalizeTo(item.path) === location.pathname || normalizeTo(item.path) === `/${currentBindPath}`
    })

    const hiddenCount = children.slice(0, currentIndex).filter((item) => item.handle?.hidden || item.index).length

    const resultIndex = currentIndex - hiddenCount
    setActiveVisibleIndex(resultIndex)
  }, [location.pathname, currentBindPath])

  return {
    sidebarRoutes,
    activeVisibleIndex,
    currentBindPath,
    location,
  }
}
