import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
      h3 : {
        color : '#2C468A', 
      },
      body2 : {
        color : '#000000'
      }
    }, 
    palette: {
      primary: {
        main: '#24CAC3',
        light : '#D8E8F2', 
        dark : '#2C468A',
      },
      secondary: {
        main: '#17405e',
        light : '#FFF36e'
      },
    }
  });

export default theme
