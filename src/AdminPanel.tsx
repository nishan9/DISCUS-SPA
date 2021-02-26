import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

function AdminPanel() {
    const [total, setTotal] = useState<number>(); 
    const [users, setUsers] = useState<number>(); 

    useEffect(() => {
        GetStats(); 
    }, [])

    async function GetStats(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Count`, { 
                headers: {
                'Content-Type': 'application/json',
                }
            });
        setTotal(await response.json());  

        const res = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Count`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        setUsers(await response.json());  
    }



    return (
        <div>
            <p>dfd</p>f

            <Box>
                <Typography variant="body2"> Total Hosted Event : {total}</Typography>
                <Typography variant="body2"> Active Users {users}</Typography>
                <Typography variant="h2">Authroize Events</Typography>

            </Box>
        </div>
    )
}

export default AdminPanel
