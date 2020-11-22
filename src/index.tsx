import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
// import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
  // <Auth0Provider
  //   domain="discus.eu.auth0.com"
  //   clientId="gfoRzpVs5QAOFNuw08R3Vlf8nqaA6c5G"
  //   audience="https://discus.eu.auth0.com/api/v2/"
  //   redirectUri={window.location.origin}
  // >
    <React.StrictMode>
      <Home />
    </React.StrictMode>,
  // </Auth0Provider>,
  document.getElementById('root')
);