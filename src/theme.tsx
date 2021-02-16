import { createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    typography: {
      h3 : {
        color : '#2C468A', 
      }
    }, 
    palette: {
      primary: {
        main: '#1F5EFF',
        light : '#2C468A', 
        dark : '#2C468A',
      },
      secondary: {
        main: '#E33E7F'
      },
    }
  });

export default theme
