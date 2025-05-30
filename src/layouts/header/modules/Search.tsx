import SvgIcon from "@/components/SvgIcon"

const Search = () => {
  return (
    <div
      className="not-drag h-29px bg-white/22 hover:bg-white/30 rounded-md w-full flex justify-center items-center cursor-pointer gap-1"
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <SvgIcon icon="iconoir:search" />
      <span>搜索</span>
    </div>
  )
}

export default Search
