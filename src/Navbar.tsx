import React from 'react';
import "./style.css";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from "react-router-dom";

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
          <Button color="inherit" onClick={() => history.push("/createEvent")}>Create Event</Button>
          <Button color="inherit" onClick={() => history.push("/searchEvent")}>Search Event</Button>
          <Button color="inherit" onClick={() => props.changeLoginState(true)}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}