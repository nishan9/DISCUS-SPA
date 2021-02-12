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
import WelcomeScreen from './WelcomeScreen';
import ViewUser from './ViewUser';
import Sidebar from './Sidebar';


export default function Home() {
    const Auth0 = useAuth0();
    const [loginPressed, setLoginPressed] = useState(false);
    const { user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
   /**    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => console.log(accessToken)));
        }
    },[Auth0]);                         //<div>Hello {user.name}</div>

**/

    return (

        Auth0.isAuthenticated ? 
        <>
            {/* if the user is authenticated */}
            
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <WelcomeScreen />
                    </Route>
                    <Route exact path="/searchUsers">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <SearchUsers/>
                    </Route>
                    <Route exact path="/createEvent">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <CreateEvent/>
                    </Route>
                    <Route exact path="/searchEvent">
                        <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} />
                        <SearchEvent/>
                    </Route>
                    <Route exact path='/users/:user_id' component={ViewUser}/>
                </Switch>
            </Router>
        </>
        :
        <>
            <Login />
        </>
    )
}
