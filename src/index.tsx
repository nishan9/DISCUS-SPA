import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import {useAuth0,Auth0Provider} from "@auth0/auth0-react";
import Login from './Login';
import { GlobalContextProvider } from './context/GlobalContext';

ReactDOM.render(
  <GlobalContextProvider>
  <Wrapper />
  </GlobalContextProvider>, 
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