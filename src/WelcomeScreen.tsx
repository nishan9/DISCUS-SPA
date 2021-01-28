import { useAuth0 } from '@auth0/auth0-react';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Auth0user from './models/Auth0user';
import SearchEvent from './SearchEvent';
import "./style.css"; 


function WelcomeScreen() {
    const Auth0 = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const [data, setData] = useState<Auth0user>()
    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])

    useEffect(() => {
        fetchData();
    }, [accessToken])

    async function fetchData(){
        const response = await fetch('http://localhost:5000/api/users/me', { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json',
            }
           });
          setData(await response.json());
    }

    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(35),
        height: theme.spacing(35),
    },
    }),
    );
    const classes = useStyles();


    return (
        
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box pt={3} >
                        <Typography variant="h3">Overview</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className="small" m={2} p={6} borderRadius="borderRadius">
                        <Avatar alt="Remy Sharp" className={classes.large} src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"/>
                    </Box>
                    <Box m={1} p={2} bgcolor="info.main" borderRadius="borderRadius">
                        <Typography variant="h3">Points</Typography>
                        <Typography variant="h4">5 Points</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}> 
                        <div>
                            <Typography variant="h4">General</Typography>
                            <Typography variant="body1">Name {data?.name}</Typography>
                            <Typography variant="body1"> <FontAwesomeIcon icon={faEnvelope} size="2x"/> {data?.email}</Typography>
                            <Typography variant="body1"><FontAwesomeIcon icon={faLinkedin} size="2x"/> {data ? data?.user_metadata.linkedin : ""}</Typography>
                            
                            <Typography variant="body1"><FontAwesomeIcon icon={faAt} size="2x"/> {data ? data?.user_metadata.sussex : ""}</Typography>
                            <Typography variant="body1">Graduation Date </Typography>
                            <Typography variant="body1">Available </Typography>
                        </div>
                    </Box>
                    <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}>
                    <Typography variant="h4">Academic</Typography>
                        <div >
                        <Typography variant="body1">{data?.user_metadata.career_stage}</Typography>
                        <Typography variant="body1">{data?.user_metadata.department}</Typography>
                        <Typography variant="body1">Summary {data?.user_metadata.research_interests}</Typography>
                        </div>
                    </Box>
                </Grid>
                <Grid  item xs={3}>
                    <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}>
                        <Typography variant="h4">Upcoming Events</Typography>
                            <div >
                                <SearchEvent/>
                            </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default WelcomeScreen
