import { createMuiTheme } from '@material-ui/core/styles'
import { pink, red } from '@material-ui/core/colors'

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
    // primary: {
    //   light: deepPurple[300],
    //   main: deepPurple[500],
    //   dark: deepPurple[700],
    // },
    // secondary: {
    //   // main: red.A700,
    // },
    primary: {
      light: '#33a095',
      main: '#00897b',
      dark: '#005f56',
    },
    secondary: pink,
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
