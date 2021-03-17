import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, {useState, useEffect, useContext} from 'react'
import EventEntity from '../../models/EventEntity'; 
import AddIcon from '@material-ui/icons/Add';
import CreateEvent from './forms/CreateEvent'
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Auth0Context } from '../../context/Auth0Context';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import EditEvent from './EditEvent'
import { EditEventContext } from '../../context/EditEventContext';
import Metadata from '../../models/Metadata';
import Auth0user from '../../models/Auth0user';
import Loading from '../../config/Loading'; 
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Moment from 'react-moment';

function UpcomingEvents() {
    const [data, setData] = useState<EventEntity[]>([]);
    const [open, setOpen] = useState(false);
    const [openNE, setOpenNE] = useState(false); 
    const Auth0 = useAuth0();
    const AuthContext = useContext(Auth0Context);
    const EventContext = useContext(EditEventContext);
    const [accessToken, setAccessToken] = useState(''); 



    useEffect(() => {
        fetchData();
        fetchEventData();
    }, [openNE, open])

    async function fetchData(){
        const token = await Auth0.getAccessTokenSilently(); 
        setAccessToken(token)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Me`, { 
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            }
        });
        AuthContext.setData(await response.json());  
    }

    async function fetchEventData(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Upcoming`);
        const recieved = await response.json();
        setData(recieved);
    }

    const handleOpen = (i : number) => {
        EventContext.setEvent(data[i]); 
        setOpen(true);        
    };

    const handleOpenNE = () => {
        setOpenNE(true);
    }

    async function deleteEvent(i : number){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/${i}`, {
            method : "DELETE"
        });
        console.log(response);
        fetchEventData(); 
    }
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseNE = () => {
        setOpenNE(false);
        fetchEventData(); 
    };


    async function updateStatus(stat : any, id : number){
        let obj; 
        if (stat === true){
            obj = {...AuthContext.data, user_metadata : {...AuthContext.data.user_metadata, events : AuthContext.data.user_metadata.events.concat([id])} }
            AuthContext.setData(obj)
        }else{
            obj = {...AuthContext.data, user_metadata : {...AuthContext.data.user_metadata, events : AuthContext.data.user_metadata.events.filter(item => item !== id)} }
            AuthContext.setData(obj)
        }
        sendreq(obj!);
    }

    async function sendreq(obj : Auth0user){

        const newEvent : Metadata = { user_metadata : obj.user_metadata }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Me`, {
            headers : {
                'Authorization': `Bearer ${accessToken}`,
                "Content-Type" : "application/json" 
            }, 
            method:"PATCH", 
            body: JSON.stringify(newEvent),
        })

        if(response.ok){
            console.log("succ add")
        }else{
            console.error("Publishing failed");
        }
        fetchEventData();
    }


    const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        overflowY: 'unset',
    },

    customizedButton: {
        padding: "10px",
        position: "absolute",
        right: -26,
        top: -27,
    }, 
    box : {
        position : "relative", 
    }, 
    eventContainer : {
        backgroundColor : "yellow", 
    }

    }));
    const classes = useStyles();

    return (
        <div>
            {data.length > 0 ? 
            <Grid container>

            {data?.map ((e,i) => 
            <Grid item xs={12} md={4}>
                <Box borderRadius="borderRadius" border={2} m={3} py={2} className={classes.box}>              
                    {AuthContext.data.app_metadata !== null ? 
                    <div className={classes.customizedButton} >
                        <Button style={{ borderRadius: 50 }}variant="contained" onClick={() => { handleOpen(i)}} color="secondary" type="submit" value="Submit"> <EditIcon/> </Button>
                        <Button style={{ borderRadius: 50 }} variant="contained" onClick={() => { deleteEvent(e.id)}} color="primary" type="submit" value="Submit"> <DeleteIcon /> </Button>
                    </div>
                    : "" }
                        <Grid container>
                            <Grid item xs={10}>
                                <Link to={`/events/${e.id}`} style={{ textDecoration: 'none', color : 'black' }}>
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <Box className={classes.eventContainer} borderRadius={3} p={1} mx={2}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <Grid item><Typography><Moment format="MMMM">{e.dateTime.toString()}</Moment> </Typography></Grid>
                                                    <Grid item><Typography><Moment format="Do">{e.dateTime.toString()}</Moment></Typography></Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Typography gutterBottom>{e.title}</Typography>
                                            <Grid container>
                                                <ScheduleIcon/><Typography><Moment format="LT">{e.dateTime.toString()}</Moment></Typography>  -  <Typography><Moment format="LT">{e.finishedDateTime.toString()}</Moment></Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Link> 
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Going?</Typography> 
                                <Checkbox
                                    icon={<CheckCircleOutlinedIcon  
                                    style={{ fill: '#8BC34A'}} />}
                                    checkedIcon={<CheckCircleIcon style={{ fill: '#8BC34A' }} />}
                                    onChange={status => updateStatus(status.target.checked, e.id)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    checked={AuthContext.data.user_metadata.events.includes(e.id)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            )} 
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit the Event</DialogTitle>
                        <DialogContent>
                               <EditEvent dialog={() => setOpen(false)}/>
                        </DialogContent>
                    </Dialog> 

            </Grid>
            : <Loading/>  }
                            
            <Dialog open={openNE} onClose={handleCloseNE} aria-labelledby="form-dialog-title">
                <DialogTitle id="id">
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}> <Typography variant="h4">Create an event</Typography></Box>
                    <Box>
                        <IconButton onClick={handleCloseNE}> <CancelIcon /> </IconButton>
                    </Box>
                </Box>
                </DialogTitle>
                <DialogContent>
                    <CreateEvent dialog={() => setOpenNE(false)}/>
                </DialogContent>
            </Dialog>

            <Fab size="large" color="primary" aria-label="add" className={classes.fab}>
                <Button onClick={(e) => handleOpenNE()} > <AddIcon/> </Button>
            </Fab>
            
        </div>
    )
}

export default UpcomingEvents