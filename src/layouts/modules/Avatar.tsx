import { Avatar as AntdAvatar, Dropdown, type MenuProps, theme } from "antd"
import React from "react"
import SvgIcon from "@/components/SvgIcon.tsx"
import { useNavigate } from "react-router-dom"

const { useToken } = theme

const Avatar = () => {
  const { token } = useToken()
  const navigation = useNavigate()

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    marginTop: 8,
    width: "225px",
  }

  const items: MenuProps["items"] = [
    {
      type: "divider",
    },
    {
      key: "1",
      label: "帮助与客服",
    },
    {
      key: "2",
      label: "设置",
    },
    {
      key: "3",
      label: "退出登录",
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          href="https://github.com/GJCoke/electron-react-template"
          className="flex justify-between items-center"
        >
          <span>源码仓库</span>
          <SvgIcon icon="radix-icons:github-logo" />
        </a>
      ),
    },
  ]

  const handelMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "2") {
      navigation("/settings")
    }
  }

  return (
    <div className="not-drag cursor-pointer" onDoubleClick={(e) => e.stopPropagation()}>
      <Dropdown
        menu={{ items, onClick: handelMenuClick }}
        trigger={["click"]}
        popupRender={(menu) => (
          <div style={contentStyle}>
            <div className="p-2">
              <div className="flex items-center gap-2">
                <AntdAvatar size={42} className="bg-green">
                  Coke
                </AntdAvatar>
                <div>Coke</div>
              </div>
            </div>
            {React.cloneElement(
              menu as React.ReactElement<{
                style: React.CSSProperties
              }>,
              { style: { boxShadow: "none" } }
            )}
          </div>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <AntdAvatar size={28} className="bg-green">
            Coke
          </AntdAvatar>
        </a>
      </Dropdown>
    </div>
  )
}

export default Avatar
