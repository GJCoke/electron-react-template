import React from "react"
import SettingHeader from "./modules/SettingHeader.tsx"
import GeneralSettings from "./modules/GeneralSettings.tsx"

const Settings: React.FC = () => {
  return (
    <div>
      <SettingHeader />
      <div className="p-4">
        <GeneralSettings />
      </div>
    </div>
  )
}

export default Settings
