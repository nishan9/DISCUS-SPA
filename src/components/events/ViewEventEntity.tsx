import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react'
import { EditEventContext } from '../../context/EditEventContext';
import EventAttendance from '../../models/EventAttendance';
import { CSVLink } from "react-csv";
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import CancelIcon from '@material-ui/icons/Cancel';
import SendEmail from '../SendEmail';
import events from '../../assets/events.svg'; 
import Moment from 'react-moment';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';

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

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                minHeight : '100vh', 
                backgroundImage: `url(${events})`, 
                backgroundRepeat : "no-repeat",
                backgroundSize: '40%', 
                backgroundPosition : 'right bottom',
                opacity : '0.9'
            },
            large: {
                width: theme.spacing(20),
                height: theme.spacing(20),
            },
            glass : {
                backgroundColor: 'rgba(255,255,255,0.9)',  
            }
            }),
        );
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
        <p>Event ID : {EventContext.event.id} </p>
            <Grid
             container
             spacing={0}
             direction="column"
             alignItems="center"
             justify="center"
             style={{ minHeight: '100vh' }}
             >
            <Grid item xs={6}>
              <Box className={classes.glass} p={1} border={3} borderRadius={4}>
                <Typography>{EventContext.event.title}</Typography>
                <Typography>Start Time -  <Moment format="DD/MM/YYYY HH:mm">{EventContext.event.dateTime}</Moment></Typography>
                <Typography>Finish Time - <Moment format="DD/MM/YYYY HH:mm">{EventContext.event.finishedDateTime}</Moment> </Typography>
                <Typography> Tags - {EventContext.event.tags}</Typography>
                <Typography variant="body2">{EventContext.event.url}</Typography>
                <Typography variant="body2"> Is DISCUS : {EventContext.event.isDISCUS.toString()}</Typography>  
                <Typography variant="h4"> Attendees</Typography>   
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
                {eventAttendance ? <CSVLink filename={EventContext.event.title} headers = {headers} data={eventAttendance.users}><GetAppIcon/></CSVLink>  : ""}
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

            </Box>
              
            </Grid>  

            </Grid> 
        </Grid>
    )
}

export default ViewEventEntity
