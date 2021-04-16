import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Grid, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import { useAuth0 } from '@auth0/auth0-react';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import discus from './assets/discus.svg'; 
import { Auth0Context } from './context/Auth0Context';

const drawerWidth = 120;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    uirotate : {
      transition : '0.5s', 
      '&:hover' : {
        transform : "rotate(60deg)",
      },
    },

    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    ButtonBase : {
      paddingTop : '30px',
      paddingBottom : '30px' 
    },
    GridStack : {
      height :`calc(100vh - ${drawerWidth}px)`
    }
  }),
);

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory(); 
  const Auth0 = useAuth0();
  const Authcontext = useContext(Auth0Context)
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      
      <Grid
          container
          spacing={0}
          justify="center"
          className={classes.GridStack}
      >
        <Box style={{ padding : "0 40px", width : '100%'}}>
          <ButtonBase className={classes.ButtonBase} color="inherit" onClick={() => history.push("/")}>
          <img className={classes.uirotate} src={discus} height='auto' width='40px' alt="DISCUS Logo"/>
          </ButtonBase>
        </Box>

        <div style={{ padding : "0 40px", width : '100%'}}>
          <ButtonBase className={classes.ButtonBase} color="inherit" onClick={() => history.push("/searchUsers")}><PeopleIcon style={{ fontSize: 35 }}/>
          </ButtonBase>
        </div>

        {Authcontext.data.user_metadata ? 
        <div style={{ padding : "0 40px", width : '100%'}}>
          <ButtonBase className={classes.ButtonBase} color="inherit" onClick={() => history.push("/Events")}> 
            <Tooltip title="Events">
              <EventIcon style={{ fontSize: 35 }}/>
            </Tooltip>
          </ButtonBase>
        </div>
        : <></>}

        {Authcontext.data.app_metadata ?   
          <div style={{ padding : "0 40px", width : '100%'}}>
            <ButtonBase className={classes.ButtonBase} color="inherit" onClick={() => history.push("/AdminPanel")}><BubbleChartIcon style={{ fontSize: 35 }}/>
            </ButtonBase>
          </div>

        :
          <>
          </>
        }

        <div style={{ padding : "0 40px", width : '100%'}}>
          <ButtonBase className={classes.ButtonBase} color="inherit" onClick={() => Auth0.logout()}><ExitToAppIcon style={{ fontSize: 35 }}/>
          </ButtonBase>
        </div>

      </Grid>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}
