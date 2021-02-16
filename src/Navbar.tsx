import React from 'react';
import "./style.css";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 0
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


interface ButtonAppBarProps {
  changeLoginState: Function
}
export default function ButtonAppBar(props: ButtonAppBarProps) {
  const classes = useStyles();
  const Auth0 = useAuth0();
  const history = useHistory(); 


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Button color="inherit" onClick={() => history.push("/")}>Dashboard</Button>
          </Typography>
          <Button color="inherit" onClick={() => history.push("/searchUsers")}>Search Users</Button>
          <Button color="inherit" onClick={() => history.push("/searchEvent")}>Events</Button>
          <Button color="inherit" onClick={() => Auth0.logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}