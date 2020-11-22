import React from 'react';
import './App.css';
// import {useAuth0} from "@auth0/auth0-react";
// import Login from './Login';
// import Home from './Home';
import { Grid, Button} from '@material-ui/core';
import logo from './assets/Reuss.png';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Home from './Home';


function App() {

  //const {isAuthenticated} = useAuth0();
  //   <div>
  //     {/* //{isAuthenticated ?  */}
  //      // <>
  //         <Home />
  //    //   </> 
  //  //   : 
  //     //   <>
  //     //     <Login />
  console.log(logo);
  //     //   </>
  //     // }
  //   </div>
    //<Button variant="contained" color="secondary" onClick={() => logout({returnTo: window.location.origin})}>Login Out</Button> 
// <Home/>
  return (
    
    <div className="background">
      <Grid container >
        <Grid item xs={12} md={6} container className="background" direction="column" >
          <Box mt={40} ml={4}>
            <Typography variant="h1" gutterBottom>
              DISCUS
            </Typography>
            <Typography variant="body1" gutterBottom>
              DISCUS is the Data Intensive Science Centre at the University of Sussex, a research unit built to address real social and economic challenges by applying data interpretation techniques developed by a cross-disciplinary team over a number of years.
            </Typography>
              <Box mt={5}>
                <Button 
                  size="large" 
                  variant="contained" 
                  color="secondary"  
                  onClick={event =>  window.location.replace('Home')}
                  >Login</Button> 
              </Box> 
            </Box>
        </Grid>
        <Grid item xs={12} md={6} direction="column">
          <img alt="Colorful Pattern Background" src={logo} width="100%"/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
