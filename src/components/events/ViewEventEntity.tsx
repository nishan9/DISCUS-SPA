import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, ButtonGroup, Card, Chip, createStyles, Grid, Link, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
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
import DiscusLogo from '../../assets/discus.svg'; 
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import appleIcon from '../../assets/appleIcon.svg';
import yahooIcon from '../../assets/yahooIcon.svg';
import outlookIcon from '../../assets/outlookIcon.svg';
import googleIcon from '../../assets/googleIcon.svg';
import office365Icon from '../../assets/365.svg';


function ViewEventEntity(props : any) {

    const EventContext = useContext(EditEventContext)
    const [accessToken, setAccessToken] = useState(''); 
    const Auth0 = useAuth0();
    const [eventAttendance,setEventAttendance ] = useState<EventAttendance>(); 
    const headers = [ { label:'Name',key:'name'}, {label:'Email Address',key:'email'}, {label:'Expertise',key:'user_metadata.expertise'}, {label:'Interests',key:'user_metadata.interest' },];
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        getEventInfo(); 
        getEventAttendance(); 
    }, [])

    useEffect(() => {
        setTags(EventContext.event.tags.split(',')); 
    }, [EventContext])

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


    const event  = {
        title: EventContext.event.title,
        description: EventContext.event.description,
        start: EventContext.event.dateTime,
        end : EventContext.event.finishedDateTime
    };


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
            <Grid
              container
              style={{ minHeight: '100vh', paddingTop : '49px', padding : '20px' }}
             >
            <Grid item md={7} sm={12}>
              <Box className={classes.glass} p={5} border={3} borderRadius={20}>
                <p>Event ID : {EventContext.event.id} </p>
                <Box pb={2}>
                    <Typography variant="h3">{EventContext.event.title}</Typography>
                </Box>
                <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     flexWrap: 'wrap',
                    }}>
                    <WatchLaterIcon/> 
                    <Typography> Start Time: &nbsp;  
                    <Moment format="LLLL">{EventContext.event.dateTime}</Moment> </Typography>
                </div>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                }}>   
                    <WatchLaterIcon/> 
                    <Typography> Finish Time:&nbsp;
                    <Moment format="LLLL">{EventContext.event.finishedDateTime}</Moment> </Typography>
                </div>

                <Box my={1}>
                {EventContext.event.isDISCUS ? 
                    <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     flexWrap: 'wrap',
                    }}>
                    <Box my={1} mr={2}><Typography display="inline"> This is a DISCUS event</Typography></Box> 
                    <img alt="DISCUS Logo" width={'35vw'} src={DiscusLogo}></img>
                    </div>
                    : 
                    <>
                    </>
                    }
                </Box>

                <Box my={1}>
                    <Button disabled style={{ backgroundColor : '#FFF36D', color : 'black' }} variant="outlined"> {EventContext.event.type}</Button>
                </Box>

                <Box my={1}>
                    <Typography> {EventContext.event.description}</Typography>
                </Box>

                <Typography display="inline"> Registration Information - </Typography> <Typography style={{ color : 'red' }}display="inline">{EventContext.event.url}</Typography>

                <Box my={2}>
                <Typography display="inline"> Tags - </Typography>
                    { tags.map( (e) => <Chip label={e} style={{backgroundColor:'#24CAC3', margin : 2}} ></Chip>) }
                </Box>

                <Box style={{ backgroundColor : '#E0E0E0'}} mt={3} p={3} >
                    <Typography variant="h4"> Attendees </Typography>   
                    {eventAttendance?.users.map (e => 
                    <Box p={0.5} m={0.5}>  
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            }}>
                            <Avatar alt="Profile Picture" src={e.picture} />
                            <Box pl={2}>
                                <Typography> {e.name} </Typography>
                            </Box>
                        </div>                    
                    </Box>
                    )}
                    <Box mx={1}>
                        Total users {eventAttendance?.total}
                    </Box>
                </Box>

                <Grid container>
                    <Box mt={1} mx={1}>
                    <Button variant="contained" color="primary" onClick={handleOpen}><MailIcon/>Invite Users</Button>
                    </Box>

                    <Box mt={1} mx={1} display="in-line">
                    {eventAttendance ? 
                        <CSVLink 
                            filename={`${EventContext.event.title}.csv`} 
                            headers = {headers} 
                            data={eventAttendance.users}>
                            <Button variant="contained" color="primary" >
                                <GetAppIcon/> Download 
                            </Button>
                        </CSVLink>  : ""}
                    </Box>
                    
                    <Grid container>
                        <Grid item xs={12}>
                            <Box my={2}>
                                <Typography> Add to calendar</Typography>
                            </Box>
                        </Grid>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Link href={outlook(event)}>
                            <Button><img width='25rem' alt="Yahoo Icon"src={outlookIcon}></img></Button>
                        </Link>
                        <Link href={yahoo(event)}>
                            <Button><img width='25rem' alt="Yahoo Icon"src={yahooIcon}></img></Button>
                        </Link>
                        <Link href={google(event)}>
                            <Button><img width='25rem' alt="Yahoo Icon"src={googleIcon}></img></Button>
                        </Link>
                        <Link href={office365(event)}>
                            <Button><img width='25rem' alt="Yahoo Icon"src={office365Icon}></img></Button>
                        </Link>
                        <Link href={ics(event)}>
                            <Button><img width='25rem' alt="Yahoo Icon"src={appleIcon}></img></Button>
                        </Link>
                    </ButtonGroup>
                </Grid>
                </Grid>

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
