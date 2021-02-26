import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import { useAuth0 } from '@auth0/auth0-react';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppsIcon from '@material-ui/icons/Apps';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

const drawerWidth = 140;

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
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
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

  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
        <List>
          <Grid container justify="center">
            <Box display="flex" flexDirection="column" p={1} m={1} bgcolor="primary">
              <Box my={5}>
                  <Button color="inherit" onClick={() => history.push("/")}><AppsIcon style={{ fontSize: 50 }}/></Button>
              </Box>
              <Box my={5}>
                <Button color="inherit" onClick={() => history.push("/searchUsers")}><PeopleIcon style={{ fontSize: 50 }}/></Button>
              </Box>
              <Box my={5}>
                <Button color="inherit" onClick={() => history.push("/searchEvent")}><EventIcon style={{ fontSize: 50 }} /></Button>
              </Box>
              <Box my={5}>
                <Button color="inherit" onClick={() => history.push("/AdminPanel")}><BubbleChartIcon style={{ fontSize: 50 }} /></Button>
              </Box>
              <Box my={5}>
                <Button color="inherit" onClick={() => Auth0.logout()}><ExitToAppIcon style={{ fontSize: 50 }} /></Button>
              </Box>
            </Box>
          </Grid>
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            DISCUS Database
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
