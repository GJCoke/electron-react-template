import { lazy } from "react"
import { Navigate, type RouteObject } from "react-router-dom"
import MainLayout from "@/layouts"

// 懒加载页面
const Dashboard = lazy(() => import("@/views/Home"))
const NotFound = lazy(() => import("@/views/404"))
const Forbidden = lazy(() => import("@/views/403"))
const ServerError = lazy(() => import("@/views/500"))

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="message" replace /> },
      {
        path: "message",
        element: <Forbidden />,
        handle: { title: "消息", icon: "hugeicons:message-notification-01" },
      },
      {
        path: "video",
        element: <NotFound />,
        handle: { title: "视频", icon: "hugeicons:video-01" },
      },
      {
        path: "date",
        element: <ServerError />,
        handle: { title: "日历", icon: "hugeicons:calendar-02" },
      },
      {
        path: "message1",
        element: <Dashboard />,
        handle: { title: "首页", icon: "hugeicons:home-03" },
      },
      {
        path: "*",
        element: <NotFound />,
        handle: { title: "404", hidden: true },
      },
      {
        path: "403",
        element: <Forbidden />,
        handle: { title: "403", hidden: true },
      },
      {
        path: "500",
        element: <ServerError />,
        handle: { title: "500", hidden: true },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound className="h-screen" />,
  },
]
