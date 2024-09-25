import React, { useMemo } from 'react'
import { CssBaseline, PaletteMode, ThemeOptions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#fff' : '#0c031a',
    },
    secondary: {
      main: '#0F1113',
    },
    background: {
      default: '#000000',
      paper: '#000',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
    },
    info: {
      main: '#B1B4B3',
    },
    success: {
      main: '#F4FDAB',
    },
    warning: {
      main: '#F72',
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
})

const Theme = ({ children }: any) => {
  const [mode] = React.useState<PaletteMode>('dark')

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Theme
