import { Box, Button, ButtonBase, Dialog, DialogActions, DialogTitle, Grid, Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import EventEntity from '../../models/EventEntity'; 
import Moment from 'react-moment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useAuth0 } from '@auth0/auth0-react';

function ApproveEvents() {
    const Auth0 = useAuth0();    
    const [ eventsToApprove, setEventsToApprove] = useState<EventEntity[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const [openDelete, setOpenDelete] = useState(false); 
    const [eventid, setEventID] = useState<number>(); 
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        getData();
    }, [Auth0])
        
    async function getData(){
        const getData = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Unauthorized`, { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        setEventsToApprove(await getData.json());  
    }

    async function ApproveEvent(e : number){
        const Authorize = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/Approve/${e}`, { 
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
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
    async function DeleteEvent(e : number){
        const Authorize = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/${e}`, { 
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        if(Authorize.ok){
            enqueueSnackbar('Event has been deleted', { variant : "success" });
        }else{
            console.error("Publishing failed");
        }
        handleCloseDelete(); 
        getData();
    }

    function openDeleteDialog(e : number){
        setEventID(e); 
        setOpenDelete(true); 
    }

    function handleCloseDelete(){
        setOpenDelete(false); 
    }

    return (
        <Grid item xs={12} lg={12}>
            <>
                <Box my={4}>
                    <Typography variant={"h4"}> Approve Events </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><Typography>Title</Typography></TableCell>
                                <TableCell><Typography>More info</Typography></TableCell>
                                <TableCell align="left"><Typography>Start Date</Typography></TableCell>
                                <TableCell align="left"><Typography>End Date</Typography></TableCell>
                                <TableCell align="left"><Typography>Action</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                        {eventsToApprove.map((row) => (
                            <TableRow>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="left">
                                <Link to={`/events/${row.id}`} style={{ textDecoration: 'none' }}>
                                Click Here
                                </Link>
                            </TableCell>
                            <TableCell align="left"><Moment format="MMMM Do YYYY, h:mm a">{row.dateTime}</Moment></TableCell>
                            <TableCell align="left"><Moment format="MMMM Do YYYY, h:mm a">{row.finishedDateTime}</Moment></TableCell>
                            <TableCell align="left">
                                <ButtonBase onClick={(e) => ApproveEvent(row.id)}><CheckCircleIcon style={{ fill : 'green', marginRight : '3px', fontSize : '25px'}}/></ButtonBase>
                                <Hidden xsDown> | </Hidden>
                                <ButtonBase onClick={(e) => openDeleteDialog(row.id)}><DeleteForeverIcon style={{ fill : 'red', fontSize : '30px'}}/></ButtonBase>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign : 'center'}}>
                    <Typography variant="h5">Are you sure you want to delete to the event?</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => DeleteEvent(eventid!)} variant="contained" style={{ backgroundColor : 'red'}} > Delete Event </Button>
                    <Button onClick={() => handleCloseDelete()} variant="contained" color="secondary"> Cancel </Button>
                </DialogActions>
                </Dialog>  
            </>
        </Grid>
    )
}

export default ApproveEvents
