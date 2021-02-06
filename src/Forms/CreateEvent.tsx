import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useAuth0 } from '@auth0/auth0-react';
import { Alert } from '@material-ui/lab';


function CreateEvent() {

    const Auth0 = useAuth0();    
    const [selectedDate, setSelectedDate] = useState <Date | null>();
    const [event, setEvent] = useState({title:"",dateTime:"",type:"",description:"",isDISCUS:true, url:""}); 
    const [accessToken, setAccessToken] = useState("");
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };


    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        setEvent({...event,dateTime:String(selectedDate)})
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
        <Box m={3}>
                <TextField 
                    required
                    margin="normal" 
                    label="Title" 
                    variant="outlined" 
                    type="text"
                    fullWidth={true} 
                    name="title" 
                    onChange={(e) => setEvent({...event,title: String(e.target.value)})}
                />
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <Grid container direction="row" alignItems="center">
                        <Box p={1}> 
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
                        </Box>
                        <Box p={1}> 
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
                        </Box>
                    </Grid>
                </Grid>
                </MuiPickersUtilsProvider>
                

                <FormControl variant="outlined" className="formcontrol">
                <Grid container direction="row" alignItems="center">

                    <InputLabel>Type</InputLabel>
                    <Select
                        style={{
                        }}
                        onChange={(e) => setEvent({...event,type:String(e.target.value)})}
                        label="Event Type"
                        defaultValue="Hackathon"
                    >
                        <MenuItem value="Hackathon">Hackathon</MenuItem>
                        <MenuItem value="Showcase">Showcase</MenuItem>
                        <MenuItem value="Networking">Networking</MenuItem>
                        <MenuItem value="Generic">Generic</MenuItem>
                    </Select>
                    <Box mx={10}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={event.isDISCUS} name="isDiscus" 
                                        onChange={(e) => setEvent({...event,isDISCUS:Boolean(e.target.checked)})}
                                        />
                                    }
                            label="A discus event"/>
                        </FormGroup>
                    </Box>
                </Grid>
                </FormControl>

                <Box my={1}>
                    <TextField 
                        required
                        margin="normal" 
                        label="registration" 
                        variant="outlined" 
                        fullWidth={true}
                        type="text" 
                        name="registration" 
                        onChange={(e) => setEvent({...event,url:e.target.value})}/>
                </Box>
                <Box my={1} >
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        fullWidth={true}
                        rows={4}
                        onChange={(e) => setEvent({...event,description:String(e.target.value)})}
                        variant="outlined"/>
                </Box>
                <Box my={2}>
                <Button variant="contained" color="secondary" type="submit" onClick={(e) =>publishEvent(e)} value="Submit">Submit</Button>
                </Box>
        </Box> 
    )
}

export default CreateEvent
