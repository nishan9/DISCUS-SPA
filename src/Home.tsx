import React from 'react'
import CreateEvent from './components/events/forms/CreateEvent';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchUsers from './SearchUsers';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import WelcomeScreen from './WelcomeScreen';
import Sidebar from './Sidebar';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ViewEventEntity from './components/events/ViewEventEntity'
import AdminPanel from './AdminPanel';
import Events from './Events';

export default function Home() {
    const Auth0 = useAuth0();

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
const classes = useStyles();


    return (
        Auth0.isAuthenticated ? 
        <>
            <div className={classes.root}>
            <Router>
                <Sidebar/>
                <Switch>
                    <Route exact path="/">
                    <main className={classes.content}>
                    <div className={classes.toolbar} />
                        <WelcomeScreen/>
                    </main>
                    </Route>
                    <Route exact path="/searchUsers">
                    <main className={classes.content}>
                    <div className={classes.toolbar} />
                        <SearchUsers/>
                        </main>
                    </Route>

                    <Route exact path="/createEvent">
                    <main className={classes.content}>
                    <div className={classes.toolbar} />
                        <CreateEvent/>
                        </main>
                    </Route>

                    <Route exact path="/AdminPanel">
                    <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <AdminPanel/>
                        </main>
                    </Route>

                    <Route exact path="/Events">
                    <main className={classes.content}>
                    <div className={classes.toolbar} />
                        <Events/>
                        </main>
                    </Route>


                    <main className={classes.content}>
                    <div className={classes.toolbar} />
                      <Route exact path='/events/:event_id' render={(props) => <ViewEventEntity {...props}/> }/>
                        </main>

                  {
                    // <main className={classes.content}>
                  //  <Route exact path='/users/:user_id' render={(props) => <ViewUser {...props}/> }/>
                  //  </main>
                  }

                </Switch>
            </Router>
            </div>
        </>
        :
        <>
            <Login/>
        </>
    )
}
