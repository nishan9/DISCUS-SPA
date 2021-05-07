import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Reuss from './assets/Reuss.svg';


export default function Login() {
    
    //Login page to redirect to Auth0 to initiate login flow
    const {loginWithRedirect } = useAuth0();
    const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        html  : {
          margin: 0,
          padding: 0,
        },
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
              <Box mx="1rem" my="2rem" alignSelf="flex-end">
              <Grid item xs={12} lg={3}>
                <Typography variant="h2" gutterBottom> DISCUS </Typography>
                <Typography variant="body1" gutterBottom> DISCUS is the Data Intensive Science Centre at the University of Sussex, a research unit built to address real social and economic challenges by applying data interpretation techniques developed by a cross-disciplinary team. </Typography>
                <Button variant="contained" color="secondary" onClick={() => loginWithRedirect()}>Portal</Button>          
              </Grid>
              </Box>
          </Grid>
        </div>
    )
}
