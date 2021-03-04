import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Select } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Context } from '../../../context/Auth0Context';
import { Autocomplete } from '@material-ui/lab';
import { AllSubjects } from '../../../config/TagSystem';
import { useSnackbar } from 'notistack';

interface CreateEventProps {
    dialog : Function
}

function CreateEvent(props : CreateEventProps) {

    const Auth0 = useAuth0();    
    const [event, setEvent] = useState({title:"",dateTime: new Date() , finishedDateTime: new Date(), type:"", url:"", description:"",isDISCUS:true, isApproved : false, tags : "" }); 
    const [accessToken, setAccessToken] = useState("");
    const AuthContext = useContext(Auth0Context)
    const [tags, setTags] = useState<string[]>([])
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        fetchData(); 
    },[Auth0]);


    async function fetchData(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Me`, { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json',
            }
           });
        AuthContext.setData(await response.json());  
    }

    async function publishEvent(e:any){
        e.preventDefault();
        
        let Alltags = ""; 
        for (var i = 0; i < tags.length; i++) {
            Alltags = Alltags.concat(tags[i] + ",");
        }

        const newEvent = {...event}
        if(AuthContext.data.app_metadata !== null){
            newEvent.isApproved = true;
            setEvent(newEvent)
        }

        const newEventTags = {...event}
        newEvent.tags = Alltags.slice(0,-1);
        setEvent(newEventTags); 


        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity`, {
            method:"POST", 
            body: JSON.stringify(newEvent),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${accessToken}`, 
            }
        })
        if(response.ok){
            if (AuthContext.data.app_metadata !== null)
            {
                enqueueSnackbar('Event has been created!', { variant : "success" });
            } else 
            {
                enqueueSnackbar('Event will be published once authorised!', { variant : "info" });

            }
            props.dialog(); 
        }else{
            console.error("Publishing failed");
        }
    }

    const handleStartDate = (date: Date) => {
        setEvent({...event, dateTime : date})
    };

    const handleFinishDate = (date: Date) => {
        setEvent({...event, finishedDateTime : date})
    };

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
                            format="yyyy-MM-dd"
                            margin="normal"
                            id="date-picker-inline"
                            disablePast
                            label="Pick a Date"
                            value={event.dateTime}
                            onChange={(e : any) => handleStartDate(e)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </Box>
                        <Box p={1}> 
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Start Time"
                                value={event.dateTime}
                                onChange={(e : any) => handleStartDate(e)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <Grid container direction="row" alignItems="center">
                        <Box p={1}> 
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-dd"
                            disablePast
                            margin="normal"
                            id="date-picker-inline"
                            label="Pick a Finish Date"
                            value={event.finishedDateTime}
                            onChange={(e : any) => handleFinishDate(e)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </Box>
                        <Box p={1}> 
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Finish Time"
                                value={event.finishedDateTime}
                                onChange={(e : any) => handleFinishDate(e)}
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
                        <Autocomplete
                            multiple
                            limitTags={5}
                            id="set Interest"
                            onChange={(obj,value,reason) => setTags(value)}
                            options={AllSubjects}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Tags" placeholder="Favorites" />
                        )}
                        />
                    </Box>
                <Box my={2}>
                    <Button disabled={AuthContext.data === null} variant="contained" color="secondary" type="submit" onClick={(e) =>publishEvent(e)} value="Submit">Submit</Button>
                </Box>
        </Box> 
    )
}

export default CreateEvent
