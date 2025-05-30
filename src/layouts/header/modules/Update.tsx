import React from "react"
import IconButton from "./IconButton"

const Update: React.FC = () => {

  const handelClickButton = () => {
    console.log("handelClickButton")
  }

  return (
    <div>
      <IconButton className="c-green" icon="line-md:uploading-loop" onClick={handelClickButton} />
    </div>
  )
}

export default Update
