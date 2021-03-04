import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { EditEventContext } from '../../context/EditEventContext';
import EventAttendance from '../../models/EventAttendance';
import { CSVLink } from "react-csv";
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import CancelIcon from '@material-ui/icons/Cancel';
import SendEmail from '../SendEmail';

function ViewEventEntity(props : any) {

    const EventContext = useContext(EditEventContext)
const [accessToken, setAccessToken] = useState(''); 
const Auth0 = useAuth0();
const [eventAttendance,setEventAttendance ] = useState<EventAttendance>(); 
const headers = [ { label:'Name',key:'name'},{label:'Email Address',key:'email'},{label:'Expertise',key:'user_metadata.expertise'}, {label:'Interests',key:'user_metadata.interest' },];
const [open, setOpen] = useState(false);

useEffect(() => {
    getEventInfo(); 
    getEventAttendance(); 
}, [])

const handleOpen = () => {
      setOpen(true);        
  };

const handleClose = () => {
      setOpen(false);
};


async function getEventInfo(){
    const token = await Auth0.getAccessTokenSilently(); 
    setAccessToken(token)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/${props.match.params.event_id}`, { 
        headers: {
          'Content-Type': 'application/json',
        }
    });
    EventContext.setEvent(await response.json()); 
}

async function getEventAttendance(){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/EventAttendance/${props.match.params.event_id}`, { 
        headers: {
          'Content-Type': 'application/json',
        }
    });
    setEventAttendance(await response.json()); 
}

    return (
        <div>
            <p>Event ID : {EventContext.event.id} </p>
            {eventAttendance ? <CSVLink filename={EventContext.event.title} headers = {headers} data={eventAttendance.users}>Download me</CSVLink>  : ""}

            <Box>
        <Typography variant={"h3"}>{EventContext.event.title}</Typography>
    </Box>
    <Box>
        <Typography variant="body2">{EventContext.event.type}</Typography>
        <Typography variant="body2">{EventContext.event.url}</Typography>
        <Typography variant="body2"> Is DISCUS : {EventContext.event.isDISCUS.toString()}</Typography>
        <Typography>{EventContext.event.description}</Typography>

        <Typography> Tags - {EventContext.event.tags}</Typography>
    </Box>  
    <Typography variant="h2"> Attendees</Typography>            
    {eventAttendance?.users.map (e => 
        <Grid container>  
            <Avatar alt="Cindy Baker" src={e.picture} />
            <Typography>{e.name}</Typography>
        </Grid>
)}
<Box>
    Total users {eventAttendance?.total}
</Box>
<Button onClick={handleOpen}><MailIcon/>Email Users</Button>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="id">
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}> <Typography variant="h4">Send Emails</Typography></Box>
                    <Box>
                        <IconButton onClick={handleClose}> <CancelIcon /> </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <SendEmail/>
            </DialogContent>
    </Dialog>

        </div>
    )
}

export default ViewEventEntity
