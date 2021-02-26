import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PieChart from './components/Charts/PieChart';
import StackedBarChart from './components/Charts/StackedBarChart';

function AdminPanel() {
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

        const total = await fetch(`https://localhost:5001/UserSearch/TotalUsers`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        setUsersTotal(await total.json()); 
    }



    return (
        <div>
            <Box>
                <Typography variant="body2"> Total Hosted Event : {eventsTotal}</Typography>
                <Typography variant="body2"> Active Users {activeUsers}</Typography>
                <Typography variant="body2">Total  Users {usersTotal} </Typography>
                


            <div style={{height : "400px", width : "100%"}}>
                <StackedBarChart/>
            </div>

            <div style={{height : "300px", width : "600px"}}>
                <PieChart/>
            </div>
            </Box>
        </div>
    )
}

export default AdminPanel
