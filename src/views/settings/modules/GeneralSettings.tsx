import React from "react"
import RadioCard from "@/views/settings/modules/RadioCard"
import { Radio } from "antd"
import { type ThemeMode, useTheme } from "@/hooks/useTheme"
import { type LayoutType, useLayout } from "@/hooks/useLayout"

interface ThemeProps {
  className?: string
}

const ThemeCard: React.FC<ThemeProps> = ({ className }) => {
  return (
    <div className={`flex flex-col flex-1 justify-center p-4 gap-4 rounded-t-md ${className}`}>
      <div className="flex gap-4 items-center">
        <div className="h-6 w-6 bg-border rounded-50%" />
        <div className="h-7 w-40 bg-border rounded-md" />
      </div>
      <div className="flex gap-4 items-center">
        <div className="h-6 w-6 bg-border rounded-50%" />
        <div className="h-7 w-32 bg-primary rounded-md" />
      </div>
    </div>
  )
}

const MainLayoutCard: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="w-full h-full flex flex-col surface">
        <div className="flex-shrink-0 c-text-surface flex justify-between p-1">
          <div className="w-5" />
          <div className="h-5 w-32 bg-border rounded-md" />
          <div className="h-5 w-5 bg-primary rounded-50%" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-8 flex-shrink-0 c-text-surface flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-border rounded-md" />
            <div className="h-6 w-6 bg-border rounded-md" />
          </div>

          <div className="flex-1 overflow-auto bg-background rounded-tl-xl"></div>
        </div>
      </div>
    </div>
  )
}

const SidebarLayoutCard: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="w-full h-full flex flex-col surface">
        <div className="flex-shrink-0 c-text-surface flex justify-between p-2" />

        <div className="flex flex-1 overflow-hidden">
          <div className="w-14 flex-shrink-0 c-text-surface flex flex-col items-center gap-2 p-2">
            <div className="w-full flex justify-between items-center">
              <div className="h-5 w-5 bg-primary rounded-50%" />
              <div className="h-3 w-3 bg-border rounded-2px" />
            </div>
            <div className="h-4 w-full bg-border rounded-2px" />
            <div className="h-4 w-full bg-border rounded-2px" />
          </div>

          <div className="flex-1 overflow-auto bg-background rounded-tl-xl"></div>
        </div>
      </div>
    </div>
  )
}

const GeneralSettings: React.FC = () => {
  const { setTheme, mode } = useTheme()
  const { setLayout, layout } = useLayout()

  const handleThemeChange = (value: ThemeMode) => {
    setTheme(value)
  }

  const handleLayoutChange = (value: LayoutType) => {
    setLayout(value)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="font-bold">主题模式</div>
        <Radio.Group className="flex gap-8" onChange={(e) => handleThemeChange(e.target.value)} value={mode}>
          <RadioCard label="浅色" value="light" active={mode === "light"} onClick={() => handleThemeChange("light")}>
            <ThemeCard className="bg-white" />
          </RadioCard>
          <RadioCard label="深色" value="dark" active={mode === "dark"} onClick={() => handleThemeChange("dark")}>
            <ThemeCard className="bg-black" />
          </RadioCard>
        </Radio.Group>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold">布局模式</div>
        <Radio.Group className="flex gap-8" onChange={(e) => handleLayoutChange(e.target.value)} value={layout}>
          <RadioCard
            label="管理布局"
            value="default"
            active={layout === "default"}
            onClick={() => handleLayoutChange("default")}
          >
            <MainLayoutCard />
          </RadioCard>
          <RadioCard
            label="简约布局"
            value="sidebar"
            active={layout === "sidebar"}
            onClick={() => handleLayoutChange("sidebar")}
          >
            <SidebarLayoutCard />
          </RadioCard>
        </Radio.Group>
      </div>
    </div>
  )
}

export default GeneralSettings
