import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Auth0user from './models/Auth0user';
import Navbar from './Navbar'

function ViewUser(props : any) {
    const [loginPressed, setLoginPressed] = useState(false);
    const [data, setData] = useState<Auth0user>()
    const user_id = "auth0|" + props.match.params.user_id; 

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData(){
        console.log(user_id)
        const response = await fetch(`http://localhost:5000/api/users/${user_id}`);
        setData(await response.json());
    }

    return (
        <div>
            <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} /> 
            <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box pt={3} >
                        <Typography variant="h3">Overview</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className="small" m={2} p={6} borderRadius="borderRadius">
                        <Avatar alt="Remy Sharp" src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"/>
                    </Box>
                    <Box m={1} p={2} bgcolor="info.main" borderRadius="borderRadius">
                        <Typography variant="h3">Points</Typography>
                        <Typography variant="h4">5 Points</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}> 
                        <div>
                            <Typography variant="h4">General</Typography>
                            <Typography variant="body1">Name {data?.name}</Typography>
                            <Typography variant="body1"> <FontAwesomeIcon icon={faEnvelope} size="2x"/> {data?.email}</Typography>
                            <Typography variant="body1"><FontAwesomeIcon icon={faLinkedin} size="2x"/> {data ? data?.user_metadata.linkedin : ""}</Typography>
                            
                            <Typography variant="body1"><FontAwesomeIcon icon={faAt} size="2x"/> {data ? data?.user_metadata.sussex : ""}</Typography>
                            <Typography variant="body1">Graduation Date </Typography>
                            <Typography variant="body1">Available </Typography>
                        </div>
                    </Box>
                    <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}>
                    <Typography variant="h4">Academic</Typography>
                        <div >
                        <Typography variant="body1">{data?.user_metadata.career_stage}</Typography>
                        <Typography variant="body1">{data?.user_metadata.department}</Typography>
                        <Typography variant="body1">Summary {data?.user_metadata.research_interests}</Typography>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>

        </div>
    )
}

export default ViewUser
