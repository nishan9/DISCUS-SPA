import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

function Statistics() {
    const [eventsTotal, setEventsTotal] = useState<number>(); 
    const [usersTotal, setUsersTotal] = useState(); 
    const [activeUsers, setActiveUsers] = useState<number>(); 

    useEffect(() => {
        GetStats()
    }, [])

    async function GetStats(){
        const events = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Count`, { 
                headers: {
                'Content-Type': 'application/json',
                }
            });
        setEventsTotal(await events.json());  

        const active = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/ActiveUsers`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        setActiveUsers(await active.json());  

        const total = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/TotalUsers`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        setUsersTotal(await total.json()); 
    }

    return (
            <Grid container>
            <Grid item lg={4} xs={6}>
                    <Grid container justify="center">
                            <Box bgcolor="primary.light" borderRadius="5%" p={3} m={1} style={{ width : '50%'}}>
                                <EventAvailableIcon style={{ fontSize: 40 }} />
                                <Grid container>
                                <Box>
                                    <Typography variant="body1"> Hosted Events </Typography>
                                </Box>
                                <Box m={2}>
                                    <Typography variant="h5">{eventsTotal}</Typography>
                                </Box>
                                </Grid>
                            </Box>
                    </Grid>
            </Grid>
            <Grid item lg={4} xs={6}>
                <Grid container justify="center">
                    <Box bgcolor="primary.light" borderRadius="5%" p={3} m={1} style={{ width : '50%'}}>
                        <PeopleAltIcon style={{ fontSize: 40 }} />
                        <Grid container>
                        <Box>
                            <Typography variant="body1">Active Users</Typography>
                        </Box>
                        <Box m={2}>
                            <Typography variant="h5"> {activeUsers}</Typography>
                        </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid item lg={4} xs={12}>
                <Grid container justify="center">
                        <Box bgcolor="primary.light" borderRadius="5%" p={3} m={1} style={{ width : '50%'}}>
                            <PeopleOutlineIcon style={{ fontSize: 40 }} />
                            <Grid container>
                            <Box>
                                <Typography variant="body1">Users Total</Typography>
                            </Box>
                            <Box m={2}>
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
