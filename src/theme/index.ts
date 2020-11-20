import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple, red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "'Inter'",
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[700],
    },
    secondary: {
      main: red.A700,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
