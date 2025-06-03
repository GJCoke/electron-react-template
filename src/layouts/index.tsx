import React from "react"
import { Button, Layout } from "antd"
import Header from "./header/index"
import Sider from "./sider"

const { Content } = Layout

const Layouts: React.FC = () => {
  return (
    <div className="surface">
      <Layout className="w-screen h-screen bg-transparent">
        <Header className="bg-transparent c-text-surface" />
        <Layout className="bg-transparent">
          <Sider className="c-text-surface" />
          <Content className="rounded-tl-xl p-xy bg-background">
            <Button type="primary">测试一下</Button>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Layouts
