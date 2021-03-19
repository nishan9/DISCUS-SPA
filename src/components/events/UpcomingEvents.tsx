import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, Fab, Grid, IconButton, makeStyles, Typography, withStyles } from '@material-ui/core';
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
import Moment from 'react-moment';
import StarIcon from '@material-ui/icons/Star';

function UpcomingEvents() {
    const [data, setData] = useState<EventEntity[]>([]);
    const [open, setOpen] = useState(false);
    const [openNE, setOpenNE] = useState(false); 
    const Auth0 = useAuth0();
    const AuthContext = useContext(Auth0Context);
    const EventContext = useContext(EditEventContext);
    const [accessToken, setAccessToken] = useState(''); 
    const [openDelete, setOpenDelete] = useState(false); 
    const [confirmDelete, setConfirmDelete] = useState<number>(); 

    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0]);

    useEffect(() => {
        fetchData();
    }, [accessToken, openNE, open])

    useEffect(() => {
        fetchEventData();
    }, [AuthContext])


    function openDeleteDialog( id : number){
        setOpenDelete(true); 
        setConfirmDelete(id); 
    }

    function handleCloseDelete(){
        setOpenDelete(false); 
    }
    async function handleDelete(){
        setOpenDelete(false); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/${confirmDelete}`, {
            method : "DELETE"
        });
        console.log(response);
        fetchEventData(); 
    }


    async function fetchData(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Me`, { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json',
            }
           });
        AuthContext.setData(await response.json());  
    }

    async function fetchEventData(){
        console.log(AuthContext.data); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Upcoming`);
        let data : EventEntity[] = await response.json();
        let newdata = data.map( item => 
            {
                item.linkedExpertise = false;
                item.linkedInterests = false
                return item
            }
        )
        const myInterests = AuthContext.data.user_metadata.interest; 
        const myExpertise = AuthContext.data.user_metadata.expertise; 
        newdata = data.map( event => 
            {
                const tags = event.tags.split(','); 
                tags.map( e => 
                    {
                        if (myInterests.includes(e)){
                            event.linkedInterests = true;
                        }
                        if (myExpertise.includes(e)){
                            event.linkedExpertise = true;
                        }
                    })
                return event
            });
        console.log(newdata);  
        setData(data);
    }

    const handleOpen = (i : number) => {
        EventContext.setEvent(data[i]); 
        setOpen(true);        
    };

    const handleOpenNE = () => {
        setOpenNE(true);
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

    const RedTypography = withStyles({
        root: {
          color: "red"
        }
      })(Typography);
      

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
        backgroundColor : "lightblue", 
    },
    centerSVG : {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        },
    leftButtons : {
        textAlign :'center',
        padding : '4px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft : 0,
            paddingRight : 0,
            PaddingTop : 0,
            paddingBottom : '2px', 
          },
    },

    }));
    const classes = useStyles();

    return (
        <div>
            {data.length > 0 ? 
            <Grid container justify="center">

            {data?.map ((e,i) => 
            <Grid item  xs={12}  sm={12} md={12} lg={5}>
                <Box borderRadius={5} border={0.5} m={3} py={2} className={classes.box}>              
                    {AuthContext.data.app_metadata !== null ? 
                    <div className={classes.customizedButton} >
                        <Button style={{ borderRadius: 50 }}variant="contained" onClick={() => { handleOpen(i)}} color="secondary" type="submit" value="Submit"> <EditIcon/> </Button>
                        <Button style={{ borderRadius: 50 }} variant="contained" onClick={() => { openDeleteDialog(e.id) }} color="primary" type="submit" value="Submit"> <DeleteIcon /> </Button>
                    </div>
                    : "" }
                        <Grid container>
                            <Grid item md={7} xs={12}>
                                <Link to={`/events/${e.id}`} style={{ textDecoration: 'none', color : 'black' }}>
                                    <Grid container>                                        
                                        <Grid item xs={4}>                                            
                                            <Box className={classes.eventContainer} borderRadius={10} pt={2} pb={2} mt={1} ml={2} mr={2}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <Grid item><Typography><Moment format="MMM">{e.dateTime.toString()}</Moment> </Typography></Grid>
                                                    <Grid item><Typography variant="h5"><Moment format="Do">{e.dateTime.toString()}</Moment></Typography></Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h4" gutterBottom>{e.title}</Typography>
                                            <Grid container>
                                                <Box className={classes.centerSVG}>
                                                    <ScheduleIcon style={{fill: "red"}}/>
                                                    <Box mx={0.3}></Box>
                                                    <RedTypography><Moment format="LT">{e.dateTime.toString()}</Moment></RedTypography> <RedTypography> <Box mx={1}>-</Box> </RedTypography> <RedTypography><Moment format="LT">{e.finishedDateTime.toString()}</Moment></RedTypography> 
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Link> 
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <Grid container justify="flex-end">
                                    
                                    <Grid item xs={3}>
                                    </Grid>

                                    <Grid item xs={7} className={classes.leftButtons}>
                                        <Box mr={2} borderRadius={20} pr={1.5} pl={1.5} pt={1} pb={1} bgcolor="secondary.light" style={{ textAlign : 'center'}}>
                                            <Typography>{e.type}</Typography>
                                        </Box>
                                    </Grid>
                                    
                                    {e.linkedExpertise && e.linkedInterests ?
                                    <Grid item xs={3} className={classes.leftButtons}>
                                        <Box pt={0.5}>
                                        <StarIcon style={{fill: "#E86161"}} fontSize="large"/>
                                        </Box>
                                    </Grid>
                                    : e.linkedExpertise ?
                                    <Grid item xs={3} className={classes.leftButtons}>
                                    <Box pt={0.5}>
                                    <StarIcon style={{fill: "#7ED6F0"}} fontSize="large"/>
                                    </Box>
                                    </Grid>
                                    : e.linkedInterests ? 
                                    <Grid item xs={3} className={classes.leftButtons}>
                                    <Box pt={0.5}>
                                    <StarIcon style={{fill: "#A9F0BA"}} fontSize="large"/>
                                    </Box>
                                    </Grid>
                                    : <> </>
                                    }
                                    <Grid item xs={7} className={classes.leftButtons}>
                                        <Box mr={2}>
                                            <Button
                                                style={{ borderRadius : 20, padding : 0}}
                                                variant="contained"
                                                size="small"
                                                fullWidth
                                                >
                                                {AuthContext.data.user_metadata.events.includes(e.id) ? <> Going</> : <>Not Going</>}
                                                <Checkbox
                                                icon={<CheckCircleOutlinedIcon  
                                                style={{ fill: '#8BC34A'}} />}
                                                checkedIcon={<CheckCircleIcon style={{ fill: '#8BC34A' }} />}
                                                onChange={status => updateStatus(status.target.checked, e.id)}
                                                checked={AuthContext.data.user_metadata.events.includes(e.id)}
                                                />
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            )} 
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle><Typography variant="h4">Edit an event</Typography></DialogTitle>
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

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle>Delete Event the Event</DialogTitle>
                <DialogContent>
                    Are you sure to delete? 
                </DialogContent>
                <Button onClick={() => handleDelete()} color="primary"> Delete Event </Button>
                <Button onClick={() => handleCloseDelete()} color="primary"> Cancel </Button>
            </Dialog> 

            <Fab size="large" color="primary" aria-label="add" className={classes.fab}>
                <Button onClick={(e) => handleOpenNE()} > <AddIcon/> </Button>
            </Fab>
            
        </div>
    )
}

export default UpcomingEvents