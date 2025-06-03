import React, { Suspense } from "react"
import { Layout, Watermark } from "antd"
import Header from "./header/index"
import Sider from "./sider"
import { Outlet } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

const { Content } = Layout

const Layouts: React.FC = () => {
  return (
    <div className="surface">
      <Layout className="w-screen h-screen bg-transparent">
        <Header className="bg-transparent c-text-surface" />
        <Layout className="bg-transparent">
          <Sider className="c-text-surface" />
          <Content className="rounded-tl-xl bg-background">
            <Watermark font={{ fontSize: 12 }} content="Coke" className="h-full w-full p-xy">
              <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
              </Suspense>
            </Watermark>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Layouts
