import React, { useState } from 'react';
import './App.css';
import { Grid, Button} from '@material-ui/core';
import logo from './assets/Reuss.svg';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Home from './Home';


function App() {

  const [AcessPortal, setAcessPortal] = useState(false);

  console.log(logo);

  return (
    <>
    {!AcessPortal ?
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
                  color="primary"
                  onClick={() => setAcessPortal(true)}
                >Login</Button> 
              </Box> 
            </Box>
        </Grid>
        <Grid item xs={12} md={6} direction="column">
          <img alt="Colorful Pattern Background" src={logo} width="100%"/>
        </Grid>
      </Grid>
    </div>: <Home />
    }
    </>
  );
}

export default App;
