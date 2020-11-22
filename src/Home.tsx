import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, FormControl, Grid, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import "./style.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Navbar from './Navbar';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';



export default function Home() {
    const {user, logout} = useAuth0();
    const [event, setEvent] = useState({title:"",date:"",eventType:"",registration:""}); 

//    const [token, setToken] = useState("");

//    useEffect(() => {
//        async function getToken(){
//            const accessToken = await useAuth0.getAccessTokenSilently(); 
//            setToken(accessToken);
//        }
//        getToken()
//    })
//            <Button variant="contained" color="secondary" onClick={() => logout({returnTo: window.location.origin})}>Login Out</Button> 


    async function publishEvent(e:any){
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/discusEvents", {
            method:"POST", 
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(response);

        if(response.ok){
            alert("Success"); 
        }else{
            console.error("Publishing failed");
        }
    }



    return (
        <>
        <Navbar/>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '90vh' }}
        >
            <Grid item xs={2}>
                <Typography variant="h3">Create Event</Typography>
                <form>
                    <TextField margin="normal" label="Title" variant="outlined" type="text" name="title" onChange={(e) => setEvent({...event,title:e.target.value})}/>
                    <TextField margin="normal" label="Date" variant="outlined" type="text" name="date" onChange={(e) => setEvent({...event,date:e.target.value})} />
                    
                    <FormControl variant="outlined" className="formcontrol">
                    <InputLabel>Type</InputLabel>
                        <Select
                            style={{
                                minWidth: 100
                            }}
                            onChange={(e) => setEvent({...event,eventType:String(e.target.value)})}
                            label="Event Type"
                        >
                        <MenuItem value="Hackathon">Hackathon</MenuItem>
                        <MenuItem value="Showcase">Showcase</MenuItem>
                        <MenuItem value="Networking">Networking</MenuItem>
                        <MenuItem value="Generic">Generic</MenuItem>
                        </Select>
                    </FormControl>

                    



                    <TextField margin="normal" label="Registration" variant="outlined" type="text" name="registration" onChange={(e) => setEvent({...event,registration:e.target.value})}/>
                    <Button variant="contained" color="secondary" type="submit" onClick={(e) =>publishEvent(e)} value="Submit">Submit</Button>
                </form>
            </Grid>   

            </Grid> 
        </>

    )
}
