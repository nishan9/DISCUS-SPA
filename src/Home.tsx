import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import CreateEvent from './Forms/CreateEvent';
import {
    BrowserRouter as Router, Switch, Route
  } from "react-router-dom";
import SearchEvent from './SearchEvent';
import SearchUsers from './SearchUsers';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import { Button } from '@material-ui/core';
import Welcome from './Welcome';

export default function Home() {
    const Auth0 = useAuth0();
    const [loginPressed, setLoginPressed] = useState(false);
    const { user } = useAuth0();
    //const [accessToken, setAccessToken] = useState("");
    /**
     *     useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
    },[Auth0]);                         //<div>Hello {user.name}</div>

     * 
     */

    return (

        Auth0.isAuthenticated ? 
        <>
            {/* if the user is authenticated */}
            
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <Welcome />
                    </Route>
                    <Route exact path="/SearchUsers">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <SearchUsers/>
                    </Route>
                    <Route exact path="/CreateEvent">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <CreateEvent/>
                    </Route>
                    <Route exact path="/SearchEvent">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <SearchEvent/>
                    </Route>
                </Switch>
            </Router>
        </>
        :
        <>
            <Login />
        </>
    )
}
