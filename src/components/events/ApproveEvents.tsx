import { Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import EventEntity from '../../models/EventEntity'; 

function ApproveEvents() {
    const [ eventsToApprove, setEventsToApprove] = useState<EventEntity[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getData();
    }, [])
        
    async function getData(){
        const getData = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Unauthorized`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        setEventsToApprove(await getData.json());  
    }

    async function ApproveEvent(e : number){
        const Authorize = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Approve/${e}`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        if(Authorize.ok){
            enqueueSnackbar('Event has been authorized', { variant : "success" });
        }else{
            console.error("Publishing failed");
        }
        getData();
    }

    return (
        <div>
            {eventsToApprove.map (e => 
            <>
                <Typography>{e.title}</Typography>
                <Button onClick={ () => ApproveEvent(e.id)}>fdfd</Button>
            </>
            )}
        </div>
    )
}

export default ApproveEvents
