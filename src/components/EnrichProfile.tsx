import { useAuth0 } from '@auth0/auth0-react';
import DateFnsUtils from '@date-io/date-fns';
import { Box, FormControl, Grid, Checkbox, InputLabel, MenuItem, Select, Typography, TextField, Button, Tooltip, Theme, withStyles } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useContext, useEffect, useState } from 'react'
import { AllSubjects } from '../config/TagSystem'
import signup from '../assets/scientist.svg'; 
import { Auth0Context } from '../context/Auth0Context';
import { useSnackbar } from 'notistack';
import DepartmentObj from '../config/Department'; 
import validator from 'validator';
import HtmlTooltip from '../themes/HtmlTooltip';
import { Link } from 'react-router-dom';


function EnrichProfile() {
    const Auth0 = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const [metadata, setMetada] = useState({sussex : "", linkedin : "", school:"",department:"",careerstage:"", research : "", expertise: [], intersts : [], available : "false", GraduationDate : new Date()}); 
    const [interests, setInterests] = useState<String[]>([]); 
    const [expertise, setExpertise] = useState<String[]>([]);
    const context = useContext(Auth0Context)
    const CHARACTER_LIMIT = 499; 
    const { enqueueSnackbar } = useSnackbar();
    const [validatedSP, setValidatedSP] = useState(true); 
    const [validatedLP, setValidatedLP] = useState(true); 


    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])
    
    const handleDateChange = (date: Date ) => {
        setMetada({...metadata, GraduationDate : date});
    };

    async function SaveMetada() {
        const gradDate = metadata.GraduationDate.toString();
        const postreq = (
            { "user_metadata" : {
                "social": {
                    "sussex": metadata.sussex,
                    "linkedIn" : metadata.linkedin, 
                  },
                  "education": {
                    "School": metadata.school,
                    "Department": metadata.department,
                    "CareerStage": metadata.careerstage,
                    "GraduationDate": gradDate,
                    "Available": metadata.available
                  },
                  "research": metadata.research,
                  "expertise": expertise,
                  "interest": interests, 
                  "events" : [], 
                }
            }
        )
        
        //sends an HTTP request to update the user 
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

    //Sends an HTTP request to retrieve the data 
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
        <form noValidate autoComplete="off">
        <Grid container justify="center">
        <Grid item lg={6} xs={12}>
            <Grid container justify="center">
                <Box mt={7}>
                    <Typography variant={"h4"}> Enrich your profile! </Typography> 
                </Box>
                <Box display="flex" mt={11} flexDirection="column-reverse" width="100%">
                    <img src={signup} height='auto' width='100%' alt="SignupImage"/>
                </Box>
            </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
                <Box mt={6} >
                <Box m={3} p={3} px={4} border={1} borderRadius={15} borderColor="primary.light">   
                <Box my={2}>
                    <Typography variant={'h4'}>Sign up now...</Typography>
                </Box>
            <Grid container direction="row" alignItems="center">
                <Box my={2} mr={3}>
                    <FormControl variant="outlined" style={{minWidth: 120}}>
                        <InputLabel>School</InputLabel>
                        <Select onChange={(e) => setMetada({...metadata,school: String(e.target.value)})} label="School" >
                            <MenuItem value="University of Sussex Business School">University of Sussex Business School</MenuItem>
                            <MenuItem value="School of Education and Social Work">School of Education and Social Work</MenuItem>
                            <MenuItem value="School of Engineering and Informatics">School of Engineering and Informatics</MenuItem>
                            <MenuItem value="School of Global Studies">School of Global Studies</MenuItem>
                            <MenuItem value="School of Law, Politics and Sociology">School of Law, Politics and Sociology</MenuItem>
                            <MenuItem value="School of Life Sciences">School of Life Sciences</MenuItem>
                            <MenuItem value="School of Mathematical and Physical Sciences">School of Mathematical and Physical Sciences</MenuItem>
                            <MenuItem value="School of Media, Arts and Humanities">School of Media, Arts and Humanities</MenuItem>
                            <MenuItem value="School of Psychology">School of Psychology</MenuItem>
                            <MenuItem value="Brighton and Sussex Medical School">Brighton and Sussex Medical School</MenuItem>
                            <MenuItem value="Doctoral School and research groups">Doctoral School and research groups</MenuItem>
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
                        : metadata.school === "School of Mathematical and Physical Sciences" ?  
                        (DepartmentObj['School of Mathematical and Physical Sciences'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))                                
                        : metadata.school === "School of Media, Arts and Humanities" ?
                        (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))  
                        : metadata.school === "School of Psychology" ?
                        (DepartmentObj['School of Psychology'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))  
                        : metadata.school === "Brighton and Sussex Medical School" ?
                        (DepartmentObj['Brighton and Sussex Medical School'].map (dep => 
                        <MenuItem value={dep}>{dep}</MenuItem>
                        ))  
                        : metadata.school === "Doctoral School and Research groups" ?
                        (DepartmentObj['Doctoral School and Research groups'].map (dep => 
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

                <div style={{ width : '100%'}}>
                    <Box my={2}>
                        <FormControl variant="outlined" style={{minWidth: 150}}>
                        <InputLabel>CareerStage</InputLabel>
                        <Select onChange={(e) => setMetada({...metadata,careerstage: String(e.target.value)})} label="Career Stage" >
                        <MenuItem value="UG">UG</MenuItem>
                        <MenuItem value="MSc">MSc</MenuItem>
                        <MenuItem value="PhD">PhD</MenuItem>
                        <MenuItem value="Postdoc">Postdoc</MenuItem>
                        <MenuItem value="Faculty">Faculty</MenuItem>
                        <MenuItem value="Professional Services">Professional Services</MenuItem>
                        </Select>
                        </FormControl>
                    </Box>
                </div>

                <div style={{ width : '100%'}}>
                <Box>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Graduation Date"
                            format="MM/dd/yyyy"
                            value={metadata.GraduationDate}
                            onChange={(e : any) => handleDateChange(e)}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Box>
                </div>

                <Box my={2}>
                    <Typography>Available for ad Hoc project work? <Checkbox onChange={(e) => setMetada({...metadata,available: String(e.target.checked)})}/> </Typography>
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
                        <HtmlTooltip title={
                                <React.Fragment>
                                    <Typography color="inherit">Put your sussex Profile URL to link your sussex profile.</Typography>
                                    <em>{"For example"}</em> <b>{'https://profiles.sussex.ac.uk/p131073-david-hendy'}</b>
                                </React.Fragment>
                            }>                        
                            <TextField 
                            fullWidth 
                            error={!validatedSP}
                            helperText={validatedSP ? "" : "Must be a valid URL or blank"}
                            onChange={(e) => setMetada({...metadata, sussex: String(e.target.value)})} 
                            label="Sussex Profile URL" 
                            variant="outlined" />
                        </HtmlTooltip>
                    </Box>

                    <Box my={2}>
                        <HtmlTooltip title={
                                <React.Fragment>
                                    <Typography color="inherit">Put your LinkedIn URL to link your LinkedIn profile.</Typography>
                                    <em>{"For example"}</em> <b>{'https://www.linkedin.com/in/m-nishan/'}</b>
                                </React.Fragment>
                            }>
                        <TextField 
                            fullWidth               
                            error={!validatedLP}
                            helperText={validatedLP ? "" : "Must be a valid URL or blank"}
                            onChange={(e) => setMetada({...metadata, linkedin: String(e.target.value)})} label="LinkedIn URL" variant="outlined" />
                        </HtmlTooltip>
                    </Box>
                    <Box my={2}>
                        You can specify your skillset here via interests and expertise tags. You are encouraged to use as many tags as you want.
                        Here is a <Link to="Tags.json" target="_blank"> link </Link>  to the tag system, the hierarchy helps us to find you, 
                        don't be afraid to specify your niche specialities.  
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
                    <Box my={2}>
                        Areas which you have an interest here.  
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
                    <Grid justify= "center" container alignItems="center" alignContent="center">
                        <Box my={2}>
                            <Button variant="contained" 
                                color="secondary"
                                onClick=
                                { () => {
                                    if ((metadata.sussex === "" || validator.isURL(metadata.sussex)) && (metadata.linkedin  === "" ||  validator.isURL(metadata.linkedin))) 
                                    {
                                        setValidatedSP(true);
                                        setValidatedLP(true);
                                        SaveMetada();
                                    } 
                                    else if (metadata.sussex === "" || validator.isURL(metadata.sussex) )
                                    {
                                        setValidatedSP(true);
                                        if (metadata.linkedin  !== "" ||  !validator.isURL(metadata.linkedin)){
                                            setValidatedLP(false);
                                        }
                                    }
                                    else if (metadata.linkedin  === "" ||  validator.isURL(metadata.linkedin))
                                    {
                                        setValidatedLP(true);
                                        if (metadata.sussex  !== "" ||  !validator.isURL(metadata.sussex)){
                                            setValidatedSP(false);
                                        }
                                    }
                                    else {
                                        setValidatedSP(false);
                                        setValidatedLP(false);
                                    }
                                }} 
                                value="Submit">Submit</Button>
                        </Box>
                    </Grid>
                </Box>
                </Box>
                </Grid>
        </Grid>
        </form>   
    )
}

export default EnrichProfile
