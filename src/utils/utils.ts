export function normalizeTo(to?: string) {
  if (!to) return "/"
  return to.startsWith("/") ? to : `/${to}`
}

export function isMacPlatform(): boolean {
  if (navigator.userAgentData) {
    return navigator.userAgentData.platform === "macOS"
  } else {
    return /Mac|iPhone|iPad|iPod/.test(navigator.platform)
  }
}

export function getCtrlOrCommandSymbol() {
  const isMac = isMacPlatform()
  return isMac ? "⌘" : "Ctrl"
}
