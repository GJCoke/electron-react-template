import React from 'react';
import { Button, Layout } from "antd"
import Header from "./header/index"

const { Sider, Content } = Layout

const Layouts: React.FC = () => {
  return (
    <div className="gradient w-screen h-screen">
      <Layout className="w-screen h-screen bg-transparent">
        <Header className="bg-transparent" />
        <Layout className="bg-transparent">
          <Sider width="64px" className="bg-transparent">
            Sider
          </Sider>
          <Content className="rounded-tl-xl p-xy" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Button type="primary">测试一下</Button>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Layouts
