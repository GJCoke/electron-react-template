import React, { Suspense } from "react"
import { Outlet } from "react-router-dom"
import LoadingSpinner from "@/components/LoadingSpinner"
import Header from "./header"
import Sidebar from "./sidebar"

const BaseLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col surface">
      <div className="h-11 flex-shrink-0 c-text-surface">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-16 flex-shrink-0 c-text-surface">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-auto bg-background rounded-tl-xl">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default BaseLayout
