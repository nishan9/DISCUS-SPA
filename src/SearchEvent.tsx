import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, Link, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, {useState, useEffect} from 'react'
import EventEntity from './models/EventEntity';


function SearchEvent() {
    const [data, setData] = useState<EventEntity[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState <Date | null>();
    const [currEvent, setCurrEvent] = useState<number>(0);
    const [newEvent, setNewEvent] = useState<EventEntity>(); 

    useEffect(() => {
        fetchData();
    },[]);

    async function fetchData(){
        const response = await fetch('https://localhost:5001/EventEntity');
        const data = await response.json();
        setData(data);
    }

    const handleOpen = (i : number) => {
        setCurrEvent(i);
        setNewEvent(data[i])
        setOpen(true);
    };

    async function handleSave(e : any){
        e.preventDefault();
        const newid = newEvent?.id; 
        const response = await fetch(`https://localhost:5001/EventEntity/${newid}`, {
            headers : {"Content-Type" : "application/json" }, 
            method:"POST", 
            body: JSON.stringify(newEvent),
        })
        if(response.ok){
            alert("Success"); 
            handleClose();
            fetchData();  
        }else{
            console.error("Publishing failed");
        }
    }

    async function deleteEvent(i : number){
        const response = await fetch(`https://localhost:5001/EventEntity/${i}`, {
            method : "DELETE"
        });
        console.log(response);
        fetchData(); 
    }
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (date: Date | null) => {
        console.log(Date)
        setSelectedDate(date);
    };


    return (
        <div>
            <Box m={3} >
                <Typography variant={"h3"}> Upcoming Events </Typography>
            </Box>
            {data.length > 0 ? 
            <Grid container>
            {data?.map ((e,i) => 
                    <Box borderRadius="borderRadius" border={1} m={3} p={5} bgcolor={"yellow"}> 
                        <Typography variant={"h4"}>{e.title}</Typography>
                            {e.dateTime}
                        <Box>
                            <Typography variant="body2">{e.type}</Typography>
                            <Typography variant="body2">{e.url}</Typography>
                            <Typography variant="body2"> Is DISCUS : {e.isDISCUS.toString()}</Typography>
                            {e.description}
                        </Box>  
                        <Button variant="contained" onClick={() => { handleOpen(i)}} color="secondary" type="submit" value="Submit">Edit</Button>
                        <Button variant="contained" onClick={() => { deleteEvent(e.id)}} color="primary" type="submit" value="Submit">Delete</Button>

                    </Box> 
            )} 
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit the Event</DialogTitle>
                        <DialogContent>
                                <TextField
                                    autoFocus
                                    defaultValue={data ? data[currEvent].title : ""}
                                    onChange={(e) => {
                                        if (newEvent !== undefined){
                                            setNewEvent({...newEvent,title : (e.target.value)})
                                        }
                                    }}
                                    margin="dense"
                                    id="title"
                                    label="Title"
                                    fullWidth
                                />
                            <FormControl variant="outlined" className="formcontrol">
                                <InputLabel>Type</InputLabel>
                                <Select
                                    style={{ minWidth: 100 }}
                                    label="Event Type"
                                    onChange={(e : React.ChangeEvent<any>) => {
                                        if (newEvent !== undefined){
                                            setNewEvent({...newEvent,type : e.target.value})
                                        }
                                    }}
                                >
                                    <MenuItem value="Hackathon">Hackathon</MenuItem>
                                    <MenuItem value="Showcase">Showcase</MenuItem>
                                    <MenuItem value="Networking">Networking</MenuItem>
                                    <MenuItem value="Generic">Generic</MenuItem>
                                </Select>
                            </FormControl>

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
                
                                <TextField
                                    autoFocus
                                    defaultValue={data ? data[currEvent].url : ""}
                                    onChange={(e) => {
                                        if (newEvent !== undefined){
                                            setNewEvent({...newEvent,url : (e.target.value)})
                                        }
                                    }}
                                    margin="dense"
                                    id="name"
                                    label="URL"
                                    fullWidth
                                />
                    <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={newEvent ? newEvent.isDISCUS : true}
                                name="isDiscus" 
                                onChange={(e) => {
                                    if (newEvent !== undefined){
                                        setNewEvent({...newEvent,isDISCUS : (e.target.checked)})
                                    }
                                }}

                                />
                            }
                        label=""
                    />
                    </FormGroup>
                    
                                <TextField
                                    autoFocus
                                    defaultValue={data ? data[currEvent].description : ""}
                                    onChange={(e) => {
                                        if (newEvent !== undefined){
                                            setNewEvent({...newEvent,description : (e.target.value)})
                                        }
                                    }}
                                    margin="dense"
                                    id="name"
                                    label="Description"
                                    fullWidth
                                />
                        </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary"> Cancel</Button>
                      <Button onClick={(e) =>handleSave(e)} color="primary"> Save</Button>
                    </DialogActions>
                  </Dialog>            
            </Grid>
            : <p>no data </p> } 
        </div>
    )
}

export default SearchEvent
