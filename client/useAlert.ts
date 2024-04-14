import { createContext, useContext } from 'react'

export const AlertContext = createContext((data: any) => console.log(data))

export function useAlert() {
  return useContext(AlertContext)
}
