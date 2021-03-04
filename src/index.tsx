import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react";
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { Auth0ContextProvider } from './context/Auth0Context';
import { SnackbarProvider } from 'notistack';
import { EditEventContextProvider } from './context/EditEventContext';
import Home from './Home';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Auth0ContextProvider>
      <EditEventContextProvider>
        <SnackbarProvider maxSnack={3}>
          <Wrapper />
        </SnackbarProvider>
      </EditEventContextProvider>
    </Auth0ContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

function Wrapper(){
  
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