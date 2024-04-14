'use client'

import { Terminal } from 'lucide-react'
import { useState } from 'react'
import { AlertContext } from '@/client/useAlert'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState(false)
  const [description, setDescription] = useState('')

  const usealert = (data: any) => {
    setDescription(data)
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 1000)
  }

  const alertSystle = 'fixed bg-gray-400 w-1/2 left-1/4'

  return (
    <>
      {alert && (
        <Alert className={alertSystle}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            {description}
          </AlertDescription>
        </Alert>
      )}

      <AlertContext.Provider value={usealert}>
        {children}
      </AlertContext.Provider>
    </>
  )
}
