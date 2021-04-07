import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, MenuItem, Select, Tooltip } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import React, { useContext, useEffect, useState } from 'react';
import { Auth0Context } from '../../../context/Auth0Context';
import { AllSubjects } from '../../../config/TagSystem';
import { InputLabel } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { Autocomplete } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';

interface CreateEventProps {
    dialog : Function
}

function CreateEvent(props : CreateEventProps) {
    const Auth0 = useAuth0();    
    const [event, setEvent] = useState({title:"", dateTime: new Date() , finishedDateTime: new Date(), type:"", url:"", description:"",isDISCUS:true, isApproved : false, tags : "" }); 
    const [accessToken, setAccessToken] = useState("");
    const AuthContext = useContext(Auth0Context)
    const [tags, setTags] = useState<string[]>([])
    const { enqueueSnackbar } = useSnackbar();
    const [validated, setValidated] = useState(true); 

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

    async function publishEvent(){
        
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
            } 
                else 
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
        <>
        <form noValidate autoComplete="off">
            <div>
            <TextField
                required
                error={!validated}
                label="Title"
                fullWidth={true} 
                variant="outlined"
                defaultValue=""
                onChange={(e) => setEvent({...event,title: String(e.target.value)})}
                helperText={validated ? "" : "Title cannot be blank."}
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
                            label="Pick a Start Date"
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
                        minDate={event.dateTime}
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

            <Grid container>
                <Grid item md={6} xs={12}>
                    <FormControl variant="outlined">
                        <InputLabel>Type</InputLabel>
                        <Select
                        style={{minWidth: 220}}
                        onChange={(e) => setEvent({...event,type:String(e.target.value)})}
                        label="Event Type"
                        >
                        <MenuItem value="Hackathon">Hackathon</MenuItem>
                        <MenuItem value="Showcase">Showcase</MenuItem>
                        <MenuItem value="Networking">Networking</MenuItem>
                        <MenuItem value="Generic">Generic</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box m={1}>
                        <FormControlLabel 
                            control={ <Checkbox 
                                    checked={event.isDISCUS} name="isDiscus" 
                                    onChange={(e) => setEvent({...event,isDISCUS:Boolean(e.target.checked)})}
                                    /> }
                            label="A discus event"/>
                   </Box>
                </Grid>
            </Grid>

            <Box>

            </Box>
            <Box my={1}>
                <TextField 
                    margin="normal" 
                    label="Registration URL" 
                    variant="outlined" 
                    fullWidth={true}
                    type="text" 
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
                <Tooltip title="Add tags for users to be matched for events">
                    <Autocomplete
                        multiple
                        limitTags={5}
                        id="set Interest"
                        onChange={(obj,value,reason) => setTags(value)}
                        options={AllSubjects}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Tags" placeholder="Add tags" />
                    )}
                    />
                </Tooltip>
            </Box>
            
            <Box mb={2}>
            <Button disabled={AuthContext.data === null} variant="contained" value="Submit" color="secondary" 
                onClick = 
                    {() => {
                            if (event.title === "") 
                            {
                                setValidated(false);
                            } 
                            else 
                            {
                                setValidated(true);
                                publishEvent(); 
                            }
                        }
                    }
            >Submit</Button>
            </Box>
        </div>
        </form>
        </>
    );
}

export default CreateEvent
