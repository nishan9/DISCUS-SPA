import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core';
import React, {useState, useEffect, useContext} from 'react'
import EventEntity from '../../models/EventEntity'; 
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Auth0Context } from '../../context/Auth0Context';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import EditEvent from './EditEvent'; 
import { EditEventContext } from '../../context/EditEventContext';
import Loading from '../../config/Loading'; 
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Moment from 'react-moment';

function PastEvents() {
    const [data, setData] = useState<EventEntity[]>([]);
    const [open, setOpen] = useState(false);
    const Auth0 = useAuth0();
    const AuthContext = useContext(Auth0Context);
    const EventContext = useContext(EditEventContext)
    const [accessToken, setAccessToken] = useState(''); 

    useEffect(() => {
        fetchData();
        fetchEventData();
    }, [])

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Past`);
        const recieved = await response.json();
        setData(recieved);
    }

    const handleOpen = (i : number) => {
        EventContext.setEvent(data[i]); 
        setOpen(true);        
    };

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
    eventContainer : {
        backgroundColor : "yellow", 
    }, 
    box : {
        position : "relative", 
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
        </div>
    )
}

export default PastEvents