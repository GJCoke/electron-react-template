import { lazy } from "react"
import { Navigate, type RouteObject } from "react-router-dom"
import MainLayout from "@/layouts"

// 懒加载页面
const Dashboard = lazy(() => import("@/views/Home"))
const Settings = lazy(() => import("@/views/NotFound"))
const NotFound = lazy(() => import("@/views/404"))
const Forbidden = lazy(() => import("@/views/403"))
const ServerError = lazy(() => import("@/views/500"))

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
      { path: "403", element: <Forbidden /> },
      { path: "500", element: <ServerError /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]
