export function getParameterByName(name: string, url: string): string | null {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function isJwtExpired(exp: number): boolean {
  const expirationTime = exp * 1000;
  const currentTime = Date.now();

  return currentTime < expirationTime;
}

export type Nullable<T> = T | null

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}