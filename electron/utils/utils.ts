export function ensureEndsWithSlash(str: string) {
  if (!str.endsWith("/")) {
    return str + "/"
  }
  return str
}
