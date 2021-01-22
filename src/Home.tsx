import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import CreateEvent from './Forms/CreateEvent';
import Welcome from './welcome';
import {
    BrowserRouter as Router, Switch, Route
  } from "react-router-dom";
import SearchEvent from './SearchEvent';
import SearchUsers from './SearchUsers';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import { Button } from '@material-ui/core';

export default function Home() {
    const Auth0 = useAuth0();
    const [loginPressed, setLoginPressed] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => console.log(accessToken)));
        }
    },[Auth0]);

    async function sendToken(e:any){
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/discusEvents", {
            method:"POST", 
            body: JSON.stringify({"dsada": 5}), 
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${accessToken}`, 
            }
        })
        console.log(response);

        if(response.ok){
            alert("Success"); 
        }else{
            console.error("Publishing failed");
        }
    }


    return (

        Auth0.isAuthenticated ? 
        <>
            {/* if the user is authenticated */}


            <Button variant="contained" color="secondary" type="submit" onClick={(e) =>sendToken(e)} value="Submit">sendthedoodoo</Button>



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
