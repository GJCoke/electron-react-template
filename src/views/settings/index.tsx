import React from "react"
import SettingHeader from "./modules/SettingHeader"
import GeneralSettings from "./modules/GeneralSettings"

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
