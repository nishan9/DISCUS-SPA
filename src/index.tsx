import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react";
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { Auth0ContextProvider } from './context/Auth0Context';
import { SnackbarProvider } from 'notistack';
import { EditEventContextProvider } from './context/EditEventContext';
import { SelectedUserContextProvider } from './context/SelectedUserContext';
import Home from './Home';
import './index.css'; 

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Auth0ContextProvider>
      <EditEventContextProvider>
        <SelectedUserContextProvider>
        <SnackbarProvider maxSnack={3}>
          <Wrapper />
        </SnackbarProvider>
        </SelectedUserContextProvider>
      </EditEventContextProvider>
    </Auth0ContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

function Wrapper(){
  //Auth0 information
  return(
    <Auth0Provider
    domain="discus.eu.auth0.com"
    clientId="..."
    audience="https://discus.eu.auth0.com/api/v2/"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Home/>
    </React.StrictMode>
  </Auth0Provider>
  );
}
