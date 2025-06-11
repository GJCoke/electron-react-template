import React, { Suspense } from "react"
import { Outlet } from "react-router-dom"
import LoadingSpinner from "@/components/LoadingSpinner"
import Sidebar from "./sidebar"
import WindowControls from "@/layouts/modules/WindowControls.tsx"

const CompactLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col surface">
      <div className="h-9 flex-shrink-0 c-text-surface drag">
        <WindowControls className="not-drag" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-40 flex-shrink-0 c-text-surface">
          <Sidebar />
        </div>

        <div className="flex flex-1 pr-2 pb-2">
          <div className="flex-1 overflow-auto bg-background rounded-xl">
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompactLayout
