import React, { type CSSProperties, useEffect, useRef, useState } from "react"
import IconButton from "./IconButton"
import { Button, Modal, Popover } from "antd"
import SvgIcon from "@/components/SvgIcon"

export type Model = "horizontal" | "vertical"

export interface UpdateProps {
  className?: string
  style?: CSSProperties
  model?: Model
}

const Update: React.FC<UpdateProps> = ({ className, style, model }) => {
  const layoutModel = model ?? "vertical"
  const [show, setShow] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [text, setText] = useState<string>("")
  const [downloaded, setDownloaded] = useState<boolean>(false)

  const [open, setOpen] = useState(false)
  const timeout = 5000
  const [openModal, setOpenModal] = useState(false)
  const timerRef = useRef<number | null>(null)

  const hidePopover = () => {
    setOpen(false)
  }

  const showPopover = () => {
    setOpen(true)
  }

  const showModal = () => {
    setOpenModal(true)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  useEffect(() => {
    window.electronUpdater?.onUpdateAvailable((info) => {
      setShow(true)
      setTitle(`发现新版本 v${info.version}`)
      setText(info.info.replace(/\\n/g, "\n"))

      showPopover()
      timerRef.current = setTimeout(() => {
        hidePopover()
      }, timeout)
    })

    window.electronUpdater?.onUpdateNotAvailable(() => {
      setShow(false)
    })

    window.electronUpdater?.onUpdateError((message) => {
      setError(true)
      setTitle("更新过程中发生错误。")
      setText(`错误信息：${message}\n您可以重启应用或联系客服以获得帮助。`)
    })

    window.electronUpdater?.onDownloaded((info) => {
      setDownloaded(true)
      setTitle("更新已准备就绪。点击“重启”即可升级到最新版。")
      setText(info.info.replace(/\\n/g, "\n"))

      if (info.force) {
        hidePopover()
        showModal()
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        showPopover()
      }
    })

    window.electronUpdater?.updateReady()
  }, [])

  const handelClickButton = () => {
    window.electronUpdater?.installUpdate()
  }

  const content = (
    <div className="whitespace-pre-line">
      <div>{text}</div>
      {downloaded && !error && (
        <div className="flex gap-2 justify-end mt-2">
          <Button size="small" onClick={hidePopover}>
            取消
          </Button>
          <Button type="primary" size="small" onClick={handelClickButton}>
            重启
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className={`${className} ${!show ? "hidden" : ""}`} style={style} onDoubleClick={(e) => e.stopPropagation()}>
      <Modal
        open={openModal}
        title="重要更新"
        centered
        closable={false}
        maskClosable={false}
        keyboard={false}
        footer={[
          <Button key="submit" type="primary" onClick={handelClickButton}>
            立即更新
          </Button>,
        ]}
      >
        <p className="whitespace-pre-line">{text}</p>
      </Modal>
      <Popover
        content={content}
        title={title}
        trigger="click"
        placement="bottom"
        open={open}
        onOpenChange={handleOpenChange}
      >
        {layoutModel === "vertical" ? (
          <div>
            <IconButton className={error ? "c-red" : "c-green"} icon="line-md:uploading-loop" />
          </div>
        ) : (
          <div className="flex gap-2 items-center cursor-pointer bg-gray-200/30 rounded-md p-1">
            <SvgIcon className={`text-20px ${error ? "c-red" : "c-green"}`} icon="line-md:uploading-loop" />
            <div className="font-bold select-none">存在新版本</div>
          </div>
        )}
      </Popover>
    </div>
  )
}

export default Update
