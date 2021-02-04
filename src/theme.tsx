import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Nunito',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

export default theme
