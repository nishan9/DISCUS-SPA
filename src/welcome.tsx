import { Box, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Auth0user from './models/Auth0user';
<link rel="stylesheet" type="text/css" href="style.css" />
function Welcome() {
    
    const [data, setData] = useState<Auth0user[]>([]);

    useEffect(() => {
        fetchData();
    },[]);
    
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
      large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
      },
    }),
  );

  
    async function fetchData(){
        const response = await fetch('http://localhost:5000/api/users/id');
        setData(await response.json());
        console.log(data)
    }
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
            <Grid item xs={3}>
            <Typography variant="h3">Overview</Typography>

            <Paper>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large}/>
            </Paper>
            <Box m={2} /> 

            <Paper>
            </Paper>
            </Grid>
            <Grid item xs={6} >
            <Box m={7} /> 

                <Paper>
                    <div>
                        <Typography variant="h4">General</Typography>
                        <Typography variant="body1">Email {data.length > 0 ? data[0].email : ""}</Typography>
                        <Typography variant="body1">LinkedIn nfm24Sussex@.com</Typography>
                        <Typography variant="body1">Sussex Profile nfm24Sussex@.com</Typography> 
                    </div>
                </Paper>
                <Box m={2} /> 
                <Paper>
                <Typography variant="h4">Academic</Typography>
                        <div>
                        <Typography>Department : </Typography>
                        <Typography>School</Typography>
                        <Typography>Career Stage</Typography>
                        <Typography>Research interest summary</Typography>
                        <Typography>Areas of expertise</Typography>
                        <Typography>Areas of interest</Typography>
                        <Typography>Areas I'd where I'd like training</Typography>
                        <Typography>Graduation</Typography>
                        </div>
                </Paper>
            </Grid>
            <Grid item xs={3}>
            <p> Blank</p>
            </Grid>
            </Grid>
        </div>
    )
}

export default Welcome
