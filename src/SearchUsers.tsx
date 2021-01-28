import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, InputBase, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Auth0user from './models/Auth0user';
import { useAuth0 } from '@auth0/auth0-react';
import Auth0userList from './models/Auth0userList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Pagination } from '@material-ui/lab';

function SearchUsers() {
    const [data, setData] = useState<Auth0userList>(); 
    const [Pagetotal, setPagetotal] = useState(0); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currPage, setCurrPage] = useState(1); 
    const [theArray, setTheArray] = useState<string[]>([]);

    
      function handleChange (checkbocName: string, state: boolean) {
        if (state === true){
            setTheArray(theArray => [...theArray, checkbocName])
        }
        if (state === false){
            const result = theArray.filter(dep => dep !== `${checkbocName}`);
            setTheArray(result); 
        }
        console.log(theArray)
    }

    

    useEffect(() => {
        fetchData();
    },[searchTerm,currPage,theArray]);


    async function fetchData(){
        if (searchTerm.length >=2 ){
            const response = await fetch(`http://localhost:5000/api/users/search/${searchTerm}/${currPage - 1}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/5))

        } else {
            let filter = "ALL"; 
            if (theArray.length !== 0 ){
                console.log("filter me")
            }

            console.log(`http://localhost:5000/api/users/page/${currPage - 1}/${filter}`); 
            const response = await fetch(`http://localhost:5000/api/users/page/${currPage - 1}/${filter}`);
            const data : Auth0userList = await response.json();
            setData(data);
            setPagetotal(Math.ceil(data.total/5))
        }
    }

    
    return (
        <div>
            <Grid container spacing={3}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>
            <Box bgcolor="info.main">
            <SearchIcon/><InputBase 
                placeholder="Search Bar"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            </Box>

            </Grid>
            <Grid item xs={3}>
            </Grid>

            <Grid item xs={3}>
                <Paper>
                <FormControl component="fieldset">
        <FormLabel component="legend">Department</FormLabel>
        <FormGroup>
        <FormControlLabel
                    control={
                        <Checkbox 
                            onChange={(e) => handleChange("enginfo", e.target.checked)} 
                        />}
                    label="Engineering and Informatics"
                />

                <FormControlLabel
                control={<Checkbox onChange={(e) => handleChange("sci", e.target.checked)} />}
                label="Life Sciences"
                />
                <FormControlLabel
                control={<Checkbox onChange={(e) => handleChange("psych", e.target.checked)} />}
                label="Psychology"
                />
        </FormGroup>
        <FormHelperText>Meow</FormHelperText>
      </FormControl>              
                </Paper>
            </Grid>
            <Grid item lg={6} >
                <Grid container>
                    {data ? data.users.map( e => (
                        <Box p={3} m={2} bgcolor="info.main" width="100%"> 
                            <Typography> {e.name}</Typography>
                            <Typography variant="body1">{e.email}</Typography> 
                            <Typography> Created at {e.created_at} </Typography>
                            <Typography> {e.user_metadata.career_stage}  </Typography>
                        </Box>
                    )) : <> </>}
                </Grid>
                
                <Pagination 
                    count={Pagetotal} 
                    color="primary" 
                    page={currPage}
                    onChange={(event, page) => setCurrPage(page)}
                />

            </Grid>
            </Grid>
        </div>
    )
}

export default SearchUsers

