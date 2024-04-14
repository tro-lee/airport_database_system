import { useRef } from 'react'

export function useCurrent() {
  const data = useRef(localStorage.getItem('current'))
  window.addEventListener('storage', () => {
    data.current = localStorage.getItem('current')
  })
  const get = () => {
    return data
  }

  const set = (value: string) => {
    localStorage.setItem('current', value)
  }
  return [get, set]
}
