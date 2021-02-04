import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useAuth0 } from '@auth0/auth0-react';


function CreateEvent() {

    const Auth0 = useAuth0();    
    const [selectedDate, setSelectedDate] = useState <Date | null>();
    const [event, setEvent] = useState({Title:"",DateTime:"",Type:"",Description:"",IsDISCUS:true, URL:""}); 
    const [accessToken, setAccessToken] = useState("");
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };


    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        setEvent({...event,DateTime:String(selectedDate)})
    },[Auth0,selectedDate]);


    async function publishEvent(e:any){
        e.preventDefault();
        const response = await fetch("https://localhost:5001/EventEntity", {
            method:"POST", 
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${accessToken}`, 
            }
        })
        if(response.ok){
            alert("Success"); 
        }else{
            console.error("Publishing failed");
        }
    }


    return (
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
                <TextField 
                    required
                    margin="normal" 
                    label="Title" 
                    variant="outlined" 
                    type="text" 
                    name="title" 
                    onChange={(e) => setEvent({...event,Title:e.target.value})}
                />
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Pick a Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Pick a Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
                </MuiPickersUtilsProvider>
                
                <FormControl variant="outlined" className="formcontrol">
                    <InputLabel>Type</InputLabel>
                    <Select
                        style={{
                            minWidth: 100
                        }}
                        onChange={(e) => setEvent({...event,Type:String(e.target.value)})}
                        label="Event Type"
                    >
                        <MenuItem value="Hackathon">Hackathon</MenuItem>
                        <MenuItem value="Showcase">Showcase</MenuItem>
                        <MenuItem value="Networking">Networking</MenuItem>
                        <MenuItem value="Generic">Generic</MenuItem>
                    </Select>

                    <FormLabel component="legend">A DISCUS event</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={event.IsDISCUS}
                                name="isDiscus" 
                                onChange={(e) => setEvent({...event,IsDISCUS:Boolean(e.target.checked)})}
                                />
                            }
                        label=""
                    />
                    </FormGroup>
                </FormControl>
                
                <Box m={3}>
                <TextField 
                    required
                    margin="normal" 
                    label="registration" 
                    variant="outlined" 
                    type="text" 
                    name="registration" 
                    onChange={(e) => setEvent({...event,URL:e.target.value})}/>

                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        onChange={(e) => setEvent({...event,Description:String(e.target.value)})}
                        variant="outlined"/>
                </Box>

                <Box m={3}></Box>
                <Button variant="contained" color="secondary" type="submit" onClick={(e) =>publishEvent(e)} value="Submit">Submit</Button>
            </form>
        </Grid>   

        </Grid> 
    )
}

export default CreateEvent
