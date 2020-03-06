import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, red, pink } from '@material-ui/core/colors';

// Create a theme instance.
// Old
const theme = createMuiTheme({
  palette: {
    primary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[700]
    },
    secondary: {
      main: red.A700
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
});

// February
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: pink[300],
//       main: pink[500],
//       dark: pink[700]
//     },
//     secondary: {
//       main: deepPurple[500]
//     },
//     error: {
//       main: red.A400
//     },
//     background: {
//       default: '#fff'
//     }
//   }
// });

export default theme;
