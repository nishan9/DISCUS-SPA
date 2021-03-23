import DateFnsUtils from '@date-io/date-fns'
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Checkbox, Box, Chip, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { EditEventContext } from '../../context/EditEventContext'; 
import { AllSubjects } from '../../config/TagSystem'

interface EditEventProps{
    dialog : Function
}

function EditEvent(props : EditEventProps) {
    const EventContext = useContext(EditEventContext)
    const [tags, setTags] = useState<string[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    let mes = ""

    useEffect(() => {
        setTags(EventContext.event.tags.split(',')); 
    }, [])

    function changeTags(value : string | null){
        mes = ""
        if (value !== null ){
            if (tags.includes(value)){   
            }else{
                setTags(state => [...state, value])
            }
        }
    }
    async function UpdateEvent(e : any){
        e.preventDefault();
    
        let Alltags = ""; 
        for (var i = 0; i < tags.length; i++) {
            Alltags = Alltags.concat(tags[i] + ",");
        }
        Alltags = Alltags.slice(0,-1)
        EventContext.event.tags = Alltags; 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/EventEntity/${EventContext.event.id}`, {
            headers : {"Content-Type" : "application/json" }, 
            method:"POST", 
            body: JSON.stringify(EventContext.event),
        })
        if(response.ok){
            enqueueSnackbar('Event has been updated', { variant : "success" });
            props.dialog(); 
        }else{
            console.error("Publishing failed");
        }
    }

    function changeChips(e : String){
        setTags(tags.filter(subject => subject !== e))
    }

    const handleStartDate = (date: Date) => {
        EventContext.setEvent({...EventContext.event, dateTime: date}); 
    };

    const handleFinishDate = (date: Date) => {
        EventContext.setEvent({...EventContext.event, finishedDateTime : date}); 
    };

    return (
        <div>
            <TextField
                autoFocus
                variant="outlined" 
                fullWidth
                defaultValue={EventContext.event.title}
                onChange={(e) => {EventContext.setEvent({...EventContext.event, title : e.target.value})}}
                margin="normal" 
                label="Title"
            />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <Grid container justify="space-around">
                        <Box p={1}> 
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                disablePast={true}
                                margin="normal"
                                id="date-picker-inline"
                                label="Pick a Date"
                                value={EventContext.event.dateTime}
                                onChange={(e : any) => handleStartDate(e)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}/>
                        </Box>

                        <Box p={1}> 
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Pick a Time"
                                value={EventContext.event.dateTime}
                                onChange={(e : any) => handleStartDate(e)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}/>
                        </Box>

                    </Grid>
                </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <Box m={1}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        disablePast={true}
                        margin="normal"
                        id="date-picker-inline"
                        label="Pick a Date"
                        value={new Date(EventContext.event.finishedDateTime)}
                        onChange={(e : any) => handleFinishDate(e)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}/>
                    </Box>
                    <Box p={1}>
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Pick a Time"
                        value={new Date(EventContext.event.finishedDateTime)}
                        onChange={(e : any) => handleFinishDate(e)}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}/>
                    </Box>
                </Grid>
            </MuiPickersUtilsProvider>

            <Grid container>
                <Grid item md={6} xs={12}>
                    <FormControl variant="outlined">
                        <InputLabel>Type</InputLabel>
                        <Select 
                            style={{ minWidth: 220 }}
                            label="Event Type"
                            defaultValue={EventContext.event.type}
                            onChange={(e : React.ChangeEvent<any>) => 
                            {EventContext.setEvent({...EventContext.event, type : e.target.value})}}
                            >
                            <MenuItem value="Hackathon">Hackathon</MenuItem>
                            <MenuItem value="Showcase">Showcase</MenuItem>
                            <MenuItem value="Networking">Networking</MenuItem>
                            <MenuItem value="Generic">Generic</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6} xs={12} >
                    <Box m={1}>
                        <FormControlLabel
                        control={
                        <Checkbox 
                        checked={EventContext.event.isDISCUS}
                        name="isDiscus" 
                        onChange={(e) => {
                        EventContext.setEvent({...EventContext.event, isDISCUS : e.target.checked})
                        }}/>}
                        label="Is a DISCUS event"
                        /> 
                    </Box>
                </Grid>
            </Grid>


            <Box my={2}>
                <TextField
                    autoFocus
                    variant="outlined" 
                    defaultValue={EventContext.event.url}
                    onChange={(e) => {
                        EventContext.setEvent({...EventContext.event, url : e.target.value})
                    }}
                    id="name"
                    label="URL"
                    fullWidth/>
            </Box>
                <Box my={2}>
                    <TextField
                        autoFocus
                        multiline
                        rows={5}
                        variant="outlined" 
                        defaultValue={EventContext.event.description}
                        onChange={(e) => {EventContext.setEvent({...EventContext.event, description : e.target.value})}}
                        margin="dense"
                        label="Description"
                        fullWidth
                    />
                </Box>

                <Box my={3}>
                    <Autocomplete
                        fullWidth
                        onChange={(event, value, reason) => changeTags(value)}
                        id="multiple-limit-tags"
                        inputValue={mes}
                        options={AllSubjects}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Add Tags" variant="outlined" />}
                    />
                        <Box my={3}>
                            {tags.map( (e) => <Chip label={e} style={{backgroundColor:'#24CAC3', margin : 2}} onDelete={() => changeChips(e)} ></Chip>)}
                        </Box>
                </Box>

                <Button variant="contained" color="secondary" onClick={UpdateEvent}> save </Button>

        </div>
    )
}

export default EditEvent
