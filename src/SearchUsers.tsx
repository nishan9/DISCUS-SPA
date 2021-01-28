import { Box, Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Auth0user from './models/Auth0user';
import { useAuth0 } from '@auth0/auth0-react';
import Auth0userList from './models/Auth0userList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
// http://localhost:5000/api/users/page/1

function SearchUsers() {
    const Auth0 = useAuth0();
    const [data, setData] = useState<Auth0userList>(); 
    const [Pagetotal, setPagetotal] = useState(0); 

    useEffect(() => {
        fetchData();
    },[]);


    async function fetchData(){
        const response = await fetch('http://localhost:5000/api/users/page/0');
        const data : Auth0userList = await response.json();
        setData(data);
        setPagetotal(data.total)
    }

    
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={8} >
                    <Grid container>
                        {data ? data.users.map( e => (

                            <NavLink to={`users/${e.user_id.slice(6)}`}>
                            <Box p={3} m={2} bgcolor="info.main" width="100%"> 
                                <Typography> {e.name}</Typography>
                                
                                <Typography variant="body1"> <FontAwesomeIcon icon={faIdBadge} size="2x"/> {e.user_metadata.career_stage} * {e.user_metadata.department}</Typography> 
                                <Typography> {e.user_metadata.research_interests}  </Typography>
                            </Box>

                            </NavLink>
                        )) : <> </>}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchUsers

