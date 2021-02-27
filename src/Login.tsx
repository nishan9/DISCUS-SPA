import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import logo from './assets/Reuss.svg';

export default function Login() {
    const {loginWithRedirect } = useAuth0();
    return (
        <Box bgcolor="primary.main">
          <Grid container>
            <Grid item xs={12} md={6} container className="background" direction="column" >
              <Box mt={40} ml={4}>
                <Typography variant="h1" gutterBottom>
                  DISCUS
                </Typography>
                <Typography variant="body1" gutterBottom>
                  DISCUS is the Data Intensive Science Centre at the University of Sussex, a research unit built to address real social and economic challenges by applying data interpretation techniques developed by a cross-disciplinary team over a number of years.
                </Typography>
                <Box mt={5}>
                  <Button variant="contained" color="secondary" onClick={() => loginWithRedirect()}>Portal</Button> 
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} direction="column">
              <img alt="Colorful Pattern Background" src={logo} width="100%"/>
            </Grid>
          </Grid>
        </Box>
    )
}
