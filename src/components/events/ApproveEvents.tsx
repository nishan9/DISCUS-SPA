import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
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

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

      const classes = useStyles();

    return (
        <div>
            <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">Finish Date</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                    {eventsToApprove.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </>
        </div>
    )
}

export default ApproveEvents
