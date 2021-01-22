import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import CreateEvent from './Forms/CreateEvent';
import Welcome from './welcome';
import {
    BrowserRouter as Router, Switch, Route, Link
  } from "react-router-dom";
import SearchEvent from './SearchEvent';
import SearchUsers from './SearchUsers';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';

export default function Home() {
    const Auth0 = useAuth0();
    const [loginPressed, setLoginPressed] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => console.log(accessToken)));
        }
    },[Auth0]);

    
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



        // <Router>
        // <>
        // {!loginPressed ?
        // <>
        // <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />

        // </>:
        //     <>
        //         <p>Login Pressed</p>
        //         <Button color="inherit" onClick={() => setLoginPressed(false)}>Log out</Button>
        //     </>}
        // </>
        // <Switch>
        //     <Route exact path="/">
        //             <Welcome/>
        //     </Route>
        //     <Route exact path="/SearchUsers">
        //             <SearchUsers/>
        //     </Route>
        //     <Route exact path="/CreateEvent">
        //         <CreateEvent/>
        //     </Route>
        //     <Route exact path="/SearchEvent">
        //         <SearchEvent/>
        //     </Route>
        // </Switch>

        // </Router>
    )
}
