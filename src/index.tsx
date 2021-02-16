import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import {useAuth0,Auth0Provider} from "@auth0/auth0-react";
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { Auth0ContextProvider } from './context/Auth0Context';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Auth0ContextProvider>
      <Wrapper />
    </Auth0ContextProvider>, 
  </ThemeProvider>, 
  document.getElementById('root')
);

function Wrapper(){
  const Auth0 = useAuth0();
  
  return(
    <Auth0Provider
    domain="discus.eu.auth0.com"
    clientId="gfoRzpVs5QAOFNuw08R3Vlf8nqaA6c5G"
    audience="https://discus.eu.auth0.com/api/v2/"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Home/>
    </React.StrictMode>
  </Auth0Provider>
  );
}