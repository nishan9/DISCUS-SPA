import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Button, Checkbox, Chip, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Auth0user from './models/Auth0user';
import "./style.css"; 
import DepartmentObj from './Department'; 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Metadata from './models/Metadata';
import { AllSubjects } from './TagSystem';
const JsonFind = require('json-find');

function WelcomeScreen() {
    const Auth0 = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const [data, setData] = useState<Auth0user>()
    const [typeValue, setTypeValue] = useState({sussex : "", school:"",department:"",careerstage:"", research : "", expertise: [], intersts : [], available : "", GraduationDate : ""}); 
    const [selectedDate, setSelectedDate] = useState <Date | null>();
    const CHARACTER_LIMIT = 499; 
    const [interests, setInterests] = useState<String[]>([]); 
    const [expertise, setExpertise] = useState<String[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [changeMeta, setUpdateMeta] = useState<Metadata>(); 
    const [subject, setSubject] = useState([]); 

    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])

    useEffect(() => {
    },[])



    useEffect(() => {
        fetchData();
    }, [accessToken])

    async function fetchData(){
        console.log(accessToken)
        const response = await fetch('https://localhost:5001/UserSearch/Me', { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json',
            }
           });
        setData(await response.json());
    }
    const date = selectedDate?.toString();

    async function SaveMetada(e : any) {
        const postreq = (
            { "user_metadata" : {
                "social": {
                    "sussex": "HUHIHOI",
                  },
                  "education": {
                    "School": typeValue.school,
                    "Department": typeValue.department,
                    "CareerStage": typeValue.careerstage,
                    "GraduationDate": date,
                    "Available": typeValue.available
                  },
                  "research": typeValue.research,
                  "expertise": expertise,
                  "interest": interests, 
                }
            }
        )

        const response = await fetch('https://localhost:5001/UserSearch/Me', { 
            method:"PATCH", 
            body: JSON.stringify(postreq),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${accessToken}`, 
            }
        })
        if(response.ok){
            alert("Success"); 
            fetchData(); 
        }else{
            console.error("Publishing failed");
        }
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    function changeEdit(){
        setEditMode(true);

        if (data !== undefined ){
            const postreq : Metadata = {
                user_metadata: {
                    social : {
                        sussex: data.user_metadata.social.sussex, 
                    },
                    education : {
                        school : data?.user_metadata.education.school,
                        department : data?.user_metadata.education.department,
                        careerStage: data?.user_metadata.education.careerStage,
                        graduationDate: data?.user_metadata.education.graduationDate,
                        available : data?.user_metadata.education.available,
                    },
                    research : data?.user_metadata.research, 
                    expertise : data.user_metadata.expertise, 
                    interest : data.user_metadata.interest
                }
            }
            setUpdateMeta(postreq)
        }

    }

    function ChangeCancel(){
        setEditMode(false)
    }

    function addtoInterests(value : { Subject : string}[]){
        setInterests(value.map ( x => (x.Subject))); 
    }

    function addtoExpertise(value : { Subject : string}[]){
        setExpertise(value.map ( x => x.Subject)); 
    }


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                '& > *': {
                margin: theme.spacing(1),
                },
            },
            large: {
                width: theme.spacing(35),
                height: theme.spacing(35),
            },
            }),
        );
    const classes = useStyles();


    return (
        <div>
        { data?.user_metadata === null ? 
        
        <div>
        <Box p={2} > <Typography color="secondary" variant={"h2"}> Enrich your profile </Typography> </Box>
        <Grid container justify = "center">
            <Grid item xs={5}>
                <Box my={3} p={3} border={1} borderColor="primary.main">                     
                <Grid container direction="row" alignItems="center">

                <Box my={1} mr={3}>

                    <FormControl variant="outlined" style={{minWidth: 120}}>
                        <InputLabel>School</InputLabel>
                        <Select onChange={(e) => setTypeValue({...typeValue,school: String(e.target.value)})} label="School" >
                            <MenuItem value="University of Sussex Business School">University of Sussex Business School</MenuItem>
                            <MenuItem value="School of Education and Social Work">School of Education and Social Work</MenuItem>
                            <MenuItem value="School of Engineering and Informatics">School of Engineering and Informatics</MenuItem>
                            <MenuItem value="School of Global Studies">School of Global Studies</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                { typeValue.school === "" ? 
                    <FormControl variant="outlined" style={{minWidth: 200}} disabled>
                    <InputLabel>Department</InputLabel>
                    <Select /> 
                    </FormControl> 
                    :
                    <Box my={2}> 
                    <FormControl variant="outlined" style={{minWidth: 200}}>
                    <InputLabel>Department</InputLabel>
                        <Select
                        onChange={(e : any) => setTypeValue({...typeValue,department: e.target.value})}
                        label="Department"
                        >
                        {   typeValue.school === "University of Sussex Business School" ?  
                        (DepartmentObj['University of Sussex Business School'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem> 
                        ))
                        : typeValue.school === "School of Education and Social Work" ?  
                        (DepartmentObj['School of Education and Social Work'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : typeValue.school === "School of Engineering and Informatics" ?  
                        (DepartmentObj['School of Engineering and Informatics'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : typeValue.school === "School of Global Studies" ?  
                        (DepartmentObj['School of Global Studies'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : typeValue.school === "School of Law, Politics and Sociology" ?  
                        (DepartmentObj['School of Law, Politics and Sociology'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : typeValue.school === "School of Life Sciences" ?  
                        (DepartmentObj['School of Life Sciences'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : typeValue.school === "School of Media, Arts and Humanities" ?  
                        (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))                                
                        : typeValue.school === "School of Media, Arts and Humanities" ?
                        (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))  
                        : <p></p>
                        }
                        </Select>
                    </FormControl>
                    </Box>
                }
                </Grid>

     
                <Grid container direction="row" alignItems="center">

                <Box my={3}>
                    <FormControl variant="outlined" style={{minWidth: 150}}>
                    <InputLabel>CareerStage</InputLabel>
                    <Select onChange={(e) => setTypeValue({...typeValue,careerstage: String(e.target.value)})} label="Career Stage" >
                    <MenuItem value="UG">UG</MenuItem>
                    <MenuItem value="MSc">MSc</MenuItem>
                    <MenuItem value="PhD">PhD</MenuItem>
                    <MenuItem value="PhD">PostDoc</MenuItem>
                    <MenuItem value="Professional Services">Professional Services</MenuItem>
                    </Select>
                    </FormControl>
                </Box>

                <Box ml={5}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Graduation Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Box>
                        <Box m={4}>
                            <Typography>Available? <Checkbox onChange={(e) => setTypeValue({...typeValue,available: String(e.target.checked)})}/> </Typography>
                        </Box>
               
                </Grid> 


                <TextField
                    id="outlined-multiline-static"
                    label="Research"
                    multiline
                    fullWidth
                    onChange={(e) => setTypeValue({...typeValue,research: String(e.target.value)})}
                    rows={4}
                    variant="outlined"
                    inputProps={{
                        maxlength: CHARACTER_LIMIT
                    }}
                />
                <Box my={2}>
                    <TextField fullWidth id="outlined-basic" label="Sussex Profile URL" variant="outlined" />
                </Box>
                


                <Box my={2}>
                    <Button variant="contained" color="secondary" type="submit" onClick={(e) => SaveMetada(e)} value="Submit">Submit</Button>
                </Box>

                </Box>
            </Grid>
        </Grid>

        </div>   
        
        :   editMode === false ?
        
        <Grid>
        <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box pt={3} >
                    <Typography variant="h3">Overview</Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box className="small" m={2} p={6} borderRadius="borderRadius">
                    <Avatar alt="Remy Sharp" className={classes.large} src={data ? data?.picture : ""}/>
                </Box>
                <Box m={1} p={2} bgcolor="info.main" borderRadius="borderRadius">
                    <Typography variant="h3">Points</Typography>
                    <Typography variant="h4">5 Points</Typography>
                </Box>
            </Grid>
            <Grid item xs={8} >
                <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}> 
                    <div>
                        <Button onClick={changeEdit}> <EditIcon/> </Button>
                        <Typography variant="h4">General</Typography>
                        <Typography variant="body1">Name {data?.name}</Typography>
                        <Typography variant="body1">{data?.email}</Typography>
                        <Typography>{data?.user_metadata.education.department}</Typography>
                        <Typography>{data?.user_metadata.education.school}</Typography>
                        <Typography>{data?.user_metadata.education.department}</Typography>
                        {data?.user_metadata.expertise.map(e => <Chip label={e}></Chip>)}
                    </div>
                </Box>
                <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}>
                <Typography variant="h4">Academic</Typography>
                    <div >
                    <Typography variant="body1"></Typography>
                    <Typography variant="body1"></Typography>
                    <Typography>{data?.user_metadata.research}</Typography>
                        {data?.user_metadata.interest.map(e => <Chip label={e}></Chip>)}
                    </div>
                </Box>
            </Grid>
        </Grid>
        </div>
        </Grid>
        : 
 
                
        <Grid>
        <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box pt={3} >
                    <Typography variant="h3">Edit Mode</Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box className="small" m={2} p={6} borderRadius="borderRadius">
                    <Avatar alt="Remy Sharp" className={classes.large} src={data ? data?.picture : ""}/>
                </Box>
                <Box m={1} p={2} bgcolor="info.main" borderRadius="borderRadius">
                    <Typography variant="h3">Points</Typography>
                    <Typography variant="h4">5 Points</Typography>
                </Box>
            </Grid>
            <Grid item xs={8} >
                <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}> 
                    <div>
                        <Button onClick={ChangeCancel}> <CancelIcon/> </Button>
                        <Typography variant="h4"></Typography>
                        <Typography variant="body1">Name {data?.name}</Typography>
                        <Typography variant="body1">{data?.email}</Typography>
                        <Typography>{data?.user_metadata.education.department}</Typography>
                        <Typography>{data?.user_metadata.education.school}</Typography>
                        <Typography>{data?.user_metadata.education.department}</Typography>
                        <Autocomplete
                            multiple
                            fullWidth
                            onChange={(event, value, reason) => console.log(value, reason)}
                            id="multiple-limit-tags"
                            options={AllSubjects}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                            <TextField {...params} variant="outlined" placeholder="Add Tags" />
                            )}
                        />

                        
                        {data?.user_metadata.expertise.map(e => <Chip label={e}></Chip>)}
                    </div>
                </Box>
                <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}>
                <Typography variant="h4">Academic</Typography>
                    <div >
                    <Typography variant="body1"></Typography>
                    <Typography variant="body1"></Typography>
                    <Typography>{data?.user_metadata.research}</Typography>
                        {data?.user_metadata.interest.map(e => <Chip label={e}></Chip>)}
                    </div>
                </Box>
            </Grid>
        </Grid>
        </div>
        </Grid>

        
        }


        </div>           
    )}


export default WelcomeScreen