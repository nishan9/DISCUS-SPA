import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Reuss from './assets/Reuss.svg';


export default function Login() {
    const {loginWithRedirect } = useAuth0();
    

    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            minHeight : '100vh', backgroundImage: `url(${Reuss})`, backgroundRepeat : "no-repeat",
            backgroundPosition : 'top right'
        }
        }),
    );
    const classes = useStyles();


    return (
        <div className={classes.root} >
          <Grid container>
            <Grid item xs={12} md={6} container direction="column" >
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
          </Grid>
        </div>
    )
}
