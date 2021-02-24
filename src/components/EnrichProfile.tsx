import { useAuth0 } from '@auth0/auth0-react';
import DateFnsUtils from '@date-io/date-fns';
import { Box, FormControl, Grid, Checkbox, InputLabel, MenuItem, Select, Typography, TextField, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useContext, useEffect, useState } from 'react'
import { AllSubjects } from './TagSystem';
import signup from '../assets/signup.jpg'; 
import { Auth0Context } from '../context/Auth0Context';
import DepartmentObj from '../Department';
import { useSnackbar } from 'notistack';


function EnrichProfile() {
    const Auth0 = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const [metadata, setMetada] = useState({sussex : "", school:"",department:"",careerstage:"", research : "", expertise: [], intersts : [], available : "false", GraduationDate : ""}); 
    const [selectedDate, setSelectedDate] = useState <Date | null>();
    const date = selectedDate?.toString();
    const [interests, setInterests] = useState<String[]>([]); 
    const [expertise, setExpertise] = useState<String[]>([]);
    const context = useContext(Auth0Context)
    const CHARACTER_LIMIT = 499; 
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])
    
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    async function SaveMetada(e : any) {
        const postreq = (
            { "user_metadata" : {
                "social": {
                    "sussex": metadata.sussex,
                  },
                  "education": {
                    "School": metadata.school,
                    "Department": metadata.department,
                    "CareerStage": metadata.careerstage,
                    "GraduationDate": date,
                    "Available": metadata.available
                  },
                  "research": metadata.research,
                  "expertise": expertise,
                  "interest": interests, 
                  "events" : [], 
                }
            }
        )

        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Me`, { 
            method:"PATCH", 
            body: JSON.stringify(postreq),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${accessToken}`, 
            }
        })
        if(response.ok){
            enqueueSnackbar('User has been updated', { variant : "success" });
            fetchData(); 
        }else{
            console.error("Publishing failed");
        }
    }

    async function fetchData(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Me`, { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json',
            }
        });
        context.setData(await response.json());  
    }
    

    return (
        <>
        <Grid container justify="center">
        <Grid item xs={6}>
            <Grid container justify="center">
                <Box mt={7}>
                    <Typography variant={"h3"}> Enrich your profile! </Typography> 
                </Box>
            </Grid>
            <Box display="flex" mt={11} flexDirection="column-reverse" width="100%">
                <img src={signup} height='auto' width='100%' alt="SignupImage"/>
            </Box>
        </Grid>
        <Grid item xs={6}>
                <Box mt={6} px={7}>
                <Box m={3} p={3} px={4} border={1} borderRadius={15} borderColor="primary.light">   
                <Box my={2}>
                    <Typography variant={'h5'}>Sign up now...</Typography>
                </Box>
            <Grid container direction="row" alignItems="center">
       

                <Box my={1} mr={3}>
                    <FormControl variant="outlined" style={{minWidth: 120}}>
                        <InputLabel>School</InputLabel>
                        <Select onChange={(e) => setMetada({...metadata,school: String(e.target.value)})} label="School" >
                            <MenuItem value="University of Sussex Business School">University of Sussex Business School</MenuItem>
                            <MenuItem value="School of Education and Social Work">School of Education and Social Work</MenuItem>
                            <MenuItem value="School of Engineering and Informatics">School of Engineering and Informatics</MenuItem>
                            <MenuItem value="School of Global Studies">School of Global Studies</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                { metadata.school === "" ? 
                    <FormControl variant="outlined" style={{minWidth: 200}} disabled>
                    <InputLabel>Department</InputLabel>
                    <Select /> 
                    </FormControl> 
                    :
                    <Box my={2}> 
                    <FormControl variant="outlined" style={{minWidth: 200}}>
                    <InputLabel>Department</InputLabel>
                        <Select
                        onChange={(e : any) => setMetada({...metadata,department: e.target.value})}
                        label="Department"
                        >
                        {   metadata.school === "University of Sussex Business School" ?  
                        (DepartmentObj['University of Sussex Business School'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem> 
                        ))
                        : metadata.school === "School of Education and Social Work" ?  
                        (DepartmentObj['School of Education and Social Work'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : metadata.school === "School of Engineering and Informatics" ?  
                        (DepartmentObj['School of Engineering and Informatics'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : metadata.school === "School of Global Studies" ?  
                        (DepartmentObj['School of Global Studies'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : metadata.school === "School of Law, Politics and Sociology" ?  
                        (DepartmentObj['School of Law, Politics and Sociology'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : metadata.school === "School of Life Sciences" ?  
                        (DepartmentObj['School of Life Sciences'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))
                        : metadata.school === "School of Media, Arts and Humanities" ?  
                        (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))                                
                        : metadata.school === "School of Media, Arts and Humanities" ?
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
                    <Select onChange={(e) => setMetada({...metadata,careerstage: String(e.target.value)})} label="Career Stage" >
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
                    <Typography>Available? <Checkbox onChange={(e) => setMetada({...metadata,available: String(e.target.checked)})}/> </Typography>
                </Box>
               
                </Grid> 
                    <TextField
                        id="outlined-multiline-static"
                        label="Research"
                        multiline
                        fullWidth
                        onChange={(e) => setMetada({...metadata,research: String(e.target.value)})}
                        rows={5}
                        variant="outlined"
                        inputProps={{
                            maxlength: CHARACTER_LIMIT
                        }}
                        helperText={`${metadata.research.length}/${CHARACTER_LIMIT}`}
                    />
                    <Box my={2}>
                        <TextField fullWidth id="outlined-basic" onChange={(e) => setMetada({...metadata, sussex: String(e.target.value)})} label="Sussex Profile URL" variant="outlined" />
                    </Box>

                    <Box my={2}>
                        <Autocomplete
                            multiple
                            limitTags={5}
                            id="set Interest"
                            onChange={(obj,value,reason) => setInterests(value)}
                            options={AllSubjects}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Expertise" placeholder="Favorites" />
                        )}
                        />
                    </Box>
                    <Box>
                        <Autocomplete
                            multiple
                            limitTags={5}
                            id="set Expertise"
                            options={AllSubjects}
                            onChange={(obj,value,reason) => setExpertise(value)}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Interests" placeholder="Favorites" />
                        )}
                        />
                    </Box>
                    <Grid  justify= "center" container alignItems="center" alignContent="center">
                        <Box my={2}>
                            <Button variant="contained" color="secondary" type="submit" onClick={(e) => SaveMetada(e)} value="Submit">Submit</Button>
                        </Box>
                    </Grid>
                </Box>

                </Box>
        
               
                </Grid>
        </Grid>
        </>   
    )
}

export default EnrichProfile
