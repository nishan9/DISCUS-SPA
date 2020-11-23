import { Button, FormControl, Grid, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Navbar from '../Navbar'; 
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { 
    MuiPickersUtilsProvider, 
    KeyboardTimePicker, 
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function CreateEvent() {


    const [selectedDate, setSelectedDate] = useState <Date | null>(
        new Date('2020-11-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        console.log(String(date));
    };
    const [event, setEvent] = useState({title:"",date:selectedDate,eventType:"",registration:""}); 

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
                    onChange={(e) => setEvent({...event,title:e.target.value})}
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
    )
}

export default CreateEvent
