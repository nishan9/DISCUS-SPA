import { Box, ButtonBase, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import EventEntity from '../../models/EventEntity'; 
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Moment from 'react-moment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';

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
    async function DeleteEvent(e : number){
        const Authorize = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/${e}`, { 
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json',
            }
        });
        if(Authorize.ok){
            enqueueSnackbar('Event has been delete', { variant : "success" });
        }else{
            console.error("Publishing failed");
        }
        getData();
    }

    const useStyles = makeStyles({

      });

      const classes = useStyles();

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
                                <TableCell align="left">Title</TableCell>
                                <TableCell>More info</TableCell>
                                <TableCell align="left">Start Date</TableCell>
                                <TableCell align="left">Finish Date</TableCell>
                                <TableCell align="left">Action</TableCell>
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
                            <TableCell align="left"><Moment format="DD/MM/YYYY HH:mm">{row.dateTime}</Moment></TableCell>
                            <TableCell align="left"><Moment format="DD/MM/YYYY HH:mm">{row.finishedDateTime}</Moment></TableCell>
                            <TableCell align="left">
                                <ButtonBase onClick={(e) => ApproveEvent(row.id)}><CheckBoxIcon/></ButtonBase>
                                <ButtonBase onClick={(e) => DeleteEvent(row.id)}><DeleteForeverIcon/></ButtonBase>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </>
        </Grid>
    )
}

export default ApproveEvents
