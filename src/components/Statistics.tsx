import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useAuth0 } from '@auth0/auth0-react';

function Statistics() {
    const Auth0 = useAuth0();    
    const [eventsTotal, setEventsTotal] = useState<number>(); 
    const [usersTotal, setUsersTotal] = useState(); 
    const [activeUsers, setActiveUsers] = useState<number>(); 
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        GetStats()
    }, [Auth0, accessToken])

    async function GetStats(){
        
        const events = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Count`, { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        setEventsTotal(await events.json());  

        const active = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/ActiveUsers`, { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        setActiveUsers(await active.json());  

        const total = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/TotalUsers`, { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        setUsersTotal(await total.json()); 
    }

    return (
            <Grid container justify="center" spacing={2}>
            <Grid item lg={4} xs={12}>
                <Grid container justify="center">
                    <Box bgcolor="primary.light" borderRadius={10} p={3} style={{ width : '90%'}}>      
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Grid item xs={2}>
                                <EventAvailableIcon style={{ fontSize: 27 }} />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="body1">Hosted Events</Typography>
                            </Grid>
                            <Box textAlign="center">
                                <Typography variant="h5"> {eventsTotal}</Typography>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid item lg={4} xs={12}>
            <Grid container justify="center">
                            <Box bgcolor="primary.light" borderRadius={10} p={3} style={{ width : '90%'}}>      
                                <Grid container direction="row" alignItems="center" justify="center">
                                    <Grid item xs={2}>
                                    <PeopleAltIcon style={{ fontSize: 27 }} />
                                    </Grid>
                                    <Grid item xs={10}>
                                    <Typography variant="body1">Active Users</Typography>
                                    </Grid>
                                    <Box textAlign="center">
                                    <Typography variant="h5"> {eventsTotal}</Typography>
                                    </Box>
                                </Grid>
                            </Box>
                    </Grid>
            </Grid>
            <Grid item lg={4} xs={12}>
                <Grid container justify="center">
                        <Box bgcolor="primary.light" borderRadius={10} p={3} style={{ width : '90%'}}>
                            <Grid container direction="row" alignItems="center" justify="center">
                                <Grid item xs={2}>
                                    <PeopleOutlineIcon style={{ fontSize: 27 }} />
                                </Grid>
                                <Grid item xs={10}>
                                <Typography variant="body1">Users Total</Typography>
                                </Grid>
                                <Box textAlign="center">
                                <Typography variant="h5"> {usersTotal}</Typography>
                                </Box>
                            </Grid>
                        </Box>
                </Grid>
            </Grid>
            </Grid>
    )
}

export default Statistics
