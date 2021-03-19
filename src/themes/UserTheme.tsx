import { createStyles, makeStyles, Theme } from '@material-ui/core'
import mySvg from '../assets/Wave.svg';

const UserTheme = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          display: 'flex',
          minHeight : ' 100vh', 
          backgroundImage: `url(${mySvg})`, 
          backgroundRepeat : "no-repeat",
          backgroundPosition : 'center bottom',
          padding : '1px',
      },
      large: {
          width: theme.spacing(15),
          height: theme.spacing(15),
      },
      glass : {
          backgroundColor: 'rgba(0,0,0,0.02)',
          border : '1px solid rgba(0,0,0,0.05)', 
          padding : '40px', 
          [theme.breakpoints.down('xs')]: {
              padding : 0
            },          
      },
      mobilePadding : {
          [theme.breakpoints.down('xs')]: {
              paddingLeft : '10px',
              paddingRight : '10px',
            },  
          },
    centerSVG : {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        },
      centerMobile : {  [theme.breakpoints.down('xs')]: { textAlign : 'center', justifyItems : 'center', justifyContent : 'center'}}, 
      }),
);

export default UserTheme
