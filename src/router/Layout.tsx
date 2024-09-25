import { FC, useEffect } from 'react'
import AppRoutes from '.'
import { gapi } from 'gapi-script'

const AppLayout: FC = () => {
  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string
    if (!clientId) {
      console.error('Google Client ID is missing.')
      return
    }

    gapi.load('client:auth2', () => {
      gapi.auth2
        .init({
          clientId,
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        })
        .then(() => {
          console.log('Google API client initialized.')
        })
        .catch((error: any) => {
          console.error('Error initializing Google API client', error)
        })
    })
  }, [])

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AppRoutes />
    </div>
  )
}

export default AppLayout
