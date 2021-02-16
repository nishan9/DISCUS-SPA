import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react'
import "./style.css"; 
import { Auth0Context } from './context/Auth0Context';
import Dashboard from './Dashboard';
import EnrichProfile from './components/EnrichProfile';
import EditUserProfile from './components/EditUserProfile';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
const drawerWidth = 140;

function WelcomeScreen() {
    const Auth0 = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const AuthContext = useContext(Auth0Context)

    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])

    useEffect(() => {
        fetchData();
    }, [accessToken])

    async function fetchData(){
        console.log(accessToken)
        const response = await fetch('https://localhost:5001/UserSearch/Me', { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json',
            }
           });
        AuthContext.setData(await response.json());  
    }
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
      // necessary for content to be below app bar
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
        <>
        { AuthContext.data.user_metadata === null ? 
                <EnrichProfile />
            :   AuthContext.edit === false ?
                <Dashboard/>
            :
                <EditUserProfile/>
        }
        </>
    )}


export default WelcomeScreen