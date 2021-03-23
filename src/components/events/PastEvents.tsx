import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, Typography, withStyles } from '@material-ui/core';
import React, {useState, useEffect, useContext} from 'react'
import EventEntity from '../../models/EventEntity'; 
import DeleteIcon from '@material-ui/icons/Delete';
import { Auth0Context } from '../../context/Auth0Context';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { EditEventContext } from '../../context/EditEventContext';
import Auth0user from '../../models/Auth0user';
import Loading from '../../config/Loading'; 
import ScheduleIcon from '@material-ui/icons/Schedule';
import Moment from 'react-moment';
import EventsTheme from '../../themes/EventsTheme';
import { useSnackbar } from 'notistack';
import NotFoundPlayer from '../../config/NotFoundPlayer';


function PastEvents() {
    const [data, setData] = useState<EventEntity[]>([]);
    const [open, setOpen] = useState(false);
    const [openNE, setOpenNE] = useState(false); 
    const Auth0 = useAuth0();
    const AuthContext = useContext(Auth0Context);
    const EventContext = useContext(EditEventContext);
    const [accessToken, setAccessToken] = useState(''); 
    const [openDelete, setOpenDelete] = useState(false); 
    const [confirmDelete, setConfirmDelete] = useState<number>(); 
    const { enqueueSnackbar } = useSnackbar();

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
        if(response.ok){
            enqueueSnackbar('Event has been deleted!', { variant : "success" });
            fetchEventData(); 
        }else{
            enqueueSnackbar('Event has not been deleted', { variant : "error" });
            fetchEventData(); 
        }  
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Past`);
        setData(await response.json());
    }


    const GreyTypography = withStyles({
    root: {
        color: "#5E5E5E"
    }
    })(Typography);
      

    const classes = EventsTheme();

    return (
        <>
            {data ? 
            <>
            { data.length === 0 ? 
                <NotFoundPlayer/> 
            :
            <>
            <Grid container justify="center">

            {data?.map ((e,i) => 
            <Grid item  xs={12}  sm={12} md={12} lg={5}>
                <Box borderRadius={9} m={3} py={3} className={classes.box}>              
                    {AuthContext.data.app_metadata !== null ? 
                    <div className={classes.customizedButton} >
                        <Button style={{ borderRadius: 50}} variant="contained" onClick={() => { openDeleteDialog(e.id) }} type="submit" value="Submit"> <DeleteIcon style={{ fill : 'red'}}/> </Button>
                    </div>
                    : "" }
                        <Grid container>
                            <Grid item md={7} xs={12}>
                                <Link to={`/events/${e.id}`} style={{ textDecoration: 'none', color : 'black' }}>
                                    <Grid container>                                        
                                        <Grid item xs={4}>                                            
                                            <Box style={{ backgroundColor : '#D3D3D3'}} borderRadius={10} pt={2} pb={2} mt={1} ml={2} mr={2}>
                                                <Grid container direction="column" justify="center" alignItems="center">
                                                    <Grid item><Typography><Moment format="MMM">{e.dateTime.toString()}</Moment> </Typography></Grid>
                                                    <Grid item><Typography variant="h5"><Moment format="Do">{e.dateTime.toString()}</Moment></Typography></Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <GreyTypography variant="h4" gutterBottom>{e.title}</GreyTypography>
                                            <Grid container>
                                                <Box className={classes.centerSVG}>
                                                    <ScheduleIcon style={{fill: "#5E5E5E"}}/>
                                                    <Box mx={0.3}></Box>
                                                    <GreyTypography><Moment format="LT">{e.dateTime.toString()}</Moment></GreyTypography> <GreyTypography> <Box mx={1}>-</Box> </GreyTypography> <GreyTypography><Moment format="LT">{e.finishedDateTime.toString()}</Moment></GreyTypography> 
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

                                    {e.type === "" ? 
                                    <Grid item xs={7} className={classes.leftButtons}>
                                    </Grid>
                                    :
                                    <Grid item xs={7} className={classes.leftButtons}>
                                        <Box mr={2} borderRadius={20} pr={1.5} pl={1.5} pt={1} pb={1} style={{ textAlign : 'center', backgroundColor : '#D3D3D3'}}>
                                            <Typography>{e.type}</Typography>
                                        </Box>
                                    </Grid>     
                                    }
                                    
                                    <Grid item xs={7} className={classes.leftButtons}>
                                        <Box mr={2}>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            )}
            </Grid>
            </>
            }
            </>
            : <Loading/>}
            
            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle><Typography variant="h5">Are you sure you want to delete the event?</Typography></DialogTitle>
            <DialogActions>
                <Button onClick={() => handleDelete()} variant="contained" color="primary" style={{ backgroundColor : 'red'}}> Delete Event </Button>
                <Button onClick={() => handleCloseDelete()} variant="contained" color="primary"> Cancel </Button>
            </DialogActions>
            </Dialog> 
            
        </>
    )
}

export default PastEvents