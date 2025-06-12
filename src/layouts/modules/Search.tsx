import SvgIcon from "@/components/SvgIcon.tsx"
import React, { type CSSProperties } from "react"
import { getCtrlOrCommandSymbol } from "@/utils/utils.ts"

export interface SearchProps {
  className?: string
  style?: CSSProperties
}

const Search: React.FC<SearchProps> = ({ className, style }) => {
  return (
    <div
      className={`${className} not-drag p-1 bg-white/22 hover:bg-white/30 rounded-md flex justify-center items-center cursor-pointer gap-2`}
      style={style}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <SvgIcon className="text-20px" icon="iconoir:search" />
      <span className="select-none">
        搜索<span className="text-14px">（{getCtrlOrCommandSymbol()} + K）</span>
      </span>
    </div>
  )
}

export default Search
