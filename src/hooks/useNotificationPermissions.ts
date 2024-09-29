import notifee, { AuthorizationStatus } from '@notifee/react-native'
import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

export const useNotificationPermissions = () => {
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  useEffect(() => {
    const requestPermissions = async () => {
      const settings = await notifee.requestPermission()
      setAuthorized(settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED)
    }

    requestPermissions()
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextState => {
      if (nextState === 'active') {
        const settings = await notifee.getNotificationSettings()
        setAuthorized(settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED)
      }
    })

    return subscription.remove
  }, [])

  return authorized
}
