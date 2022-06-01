/* eslint-disable @typescript-eslint/no-explicit-any */

type Timeout = ReturnType<typeof setTimeout>

export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: Timeout | null
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeout as Timeout)
    timeout = setTimeout(() => {
      timeout = null
      func.apply(this, args)
    }, wait)
  }
}
