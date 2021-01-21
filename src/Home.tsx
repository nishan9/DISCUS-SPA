import { Button, FormControl, Grid, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import CreateEvent from './Forms/CreateEvent';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function Home() {
//    const {user, logout} = useAuth0(); // 
    const [loginPressed, setLoginPressed] = useState(false);

    
    return (
        <Router>
        <>
        {!loginPressed ?
        <>
        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />

        </>:
            <>
                <p>Login Pressed</p>
                <Button color="inherit" onClick={() => setLoginPressed(false)}>Log out</Button>
            </>}
        </>
        <Switch>
            <Route exact path="/CreateEvent">
                <CreateEvent/>
            </Route>
        </Switch>

        </Router>
    )
}
