import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, Link, makeStyles, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, {useState, useEffect} from 'react'
import EventEntity from './models/EventEntity';
import AddIcon from '@material-ui/icons/Add';
import CreateEvent from './Forms/CreateEvent';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function SearchEvent() {
    const [data, setData] = useState<EventEntity[]>([]);
    const [open, setOpen] = useState(false);
    const [openNE, setOpenNE] = useState(false); 
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

    const handleOpenNE = () => {
        setOpenNE(true);
    }

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

    const handleCloseNE = () => {
        setOpenNE(false);
        fetchData(); 
    };

    const handleDateChange = (date: Date | null) => {
        console.log(Date)
        setSelectedDate(date);
    };

    

    const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        overflowY: 'unset',
    },

    customizedButton: {
        padding: "10px",
        position: "absolute",
        right: -26,
        top: -27,
    }, 
    box : {
        position : "relative", 
    }

    }));
    const classes = useStyles();

    return (
        <div>
            <Box m={3} >
                <Typography variant={"h3"}> Upcoming Events </Typography>
            </Box>
            {data.length > 0 ? 
            <Grid container>
            {data?.map ((e,i) => 
                    <Box width="30%" borderRadius="borderRadius" border={1} m={3} p={4} className={classes.box}> 
                        <div className={classes.customizedButton} >
                            <Button style={{ borderRadius: 50 }}variant="contained" onClick={() => { handleOpen(i)}} color="secondary" type="submit" value="Submit"> <EditIcon/> </Button>
                            <Button style={{ borderRadius: 50 }} variant="contained" onClick={() => { deleteEvent(e.id)}} color="primary" type="submit" value="Submit"> <DeleteIcon /> </Button>
                        </div>
                        <Typography variant={"h4"}>{e.title}</Typography>
                            {e.dateTime}
                        <Box>
                            <Typography variant="body2">{e.type}</Typography>
                            <Typography variant="body2">{e.url}</Typography>
                            <Typography variant="body2"> Is DISCUS : {e.isDISCUS.toString()}</Typography>
                            {e.description}
                        </Box>  
                    </Box> 
            )} 
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit the Event</DialogTitle>
                        <DialogContent>
                                <TextField
                                    autoFocus
                                    defaultValue={newEvent ? newEvent.title : ""}
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
                                    defaultValue={newEvent ? newEvent.type : "Hackathon"}
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
                        label="Is a DISCUS event"
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
                                    multiline
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
                            
            <Dialog open={openNE} onClose={handleCloseNE} aria-labelledby="form-dialog-title">
                <DialogTitle id="id">
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}> <Typography variant="h4">Create an event</Typography></Box>
                    <Box>
                        <IconButton onClick={handleCloseNE}>
                        <CancelIcon />
                        </IconButton>
                    </Box>
                </Box>
                </DialogTitle>
            <DialogContent>
                <CreateEvent/>
            </DialogContent>
            </Dialog>

            <Fab size="large" color="primary" aria-label="add" className={classes.fab}>
                <Button onClick={(e) => handleOpenNE()} > <AddIcon/> </Button>
            </Fab>
            
        </div>
    )
}

export default SearchEvent
