import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

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
            <>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Typography variant="body2"> Total Hosted Event : {eventsTotal}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2"> Active Users {activeUsers}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2">Total  Users {usersTotal} </Typography>
                    </Grid>
                </Grid>
            </>
    )
}

export default Statistics
