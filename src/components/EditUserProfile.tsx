import { Grid, Box, Typography, Avatar, Button, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Checkbox, createStyles, makeStyles, Theme, FormControlLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Auth0Context } from '../context/Auth0Context';
import { AllSubjects } from '../config/TagSystem'
import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';
import Points from './Points';
import DepartmentObj from '../config/Department'; 
import EmailIcon from '@material-ui/icons/Email';
import SchoolIcon from '@material-ui/icons/School';
import mySvg from '../assets/Wave.svg';


function EditUserProfile() {
    const AuthContext = useContext(Auth0Context);
    const Auth0 = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const { enqueueSnackbar } = useSnackbar();

    //Editable Fields
    const [name, setName] = useState<string>(""); 
    const [school, setSchool] = useState<string>(""); 
    const [department, setDepartment] = useState<string>(""); 
    const [careerStage, setCareerStage] = useState<string>(""); 
    const [research, setResearch] = useState<string>(""); 
    const [interests, setInterest] = useState<String[]>([]); 
    const [expertise, setExpertise] = useState<String[]>([]); 
    const [available, setAvailable] = useState(false); 
    const [graduation, setGraduation] = useState<string>(""); 
    const [sussexURL, setSussexURL] = useState<string>(""); 
    let mes = ""

    useEffect(() => {
        LoadStates(); 
    }, []);

    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])

    function LoadStates(){
        if (AuthContext.data !== undefined ){
            setName(AuthContext.data.name); 
            setSchool(AuthContext.data.user_metadata.education.school); 
            setDepartment(AuthContext.data.user_metadata.education.department); 
            setCareerStage(AuthContext.data.user_metadata.education.careerStage); 
            setGraduation(AuthContext.data.user_metadata.education.graduationDate)
            setInterest(AuthContext.data.user_metadata.interest); 
            setResearch(AuthContext.data.user_metadata.research);
            setSussexURL(AuthContext.data.user_metadata.social.sussex)
            setExpertise(AuthContext.data.user_metadata.expertise); 
            if (AuthContext.data.user_metadata.education.available === "true")
            {
                setAvailable(true)
            }
        }
    }

    function DeleteChipIntrest(e : String){
        setInterest(interests.filter(subject => subject !== e))
    }

    function DeleteChipExpertise(e : String){
        setExpertise(expertise.filter(subject => subject !== e))
    }


    async function UpdateUser(){
        const stravail = available.toString(); 
        const postreq = (
            {   "name" : name, 
                "user_metadata" : {
                "social": {
                    "sussex": sussexURL,
                  },
                  "education": {
                    "School": school,
                    "Department": department,
                    "CareerStage": careerStage,
                    "GraduationDate": graduation,
                    "Available": stravail
                  },
                  "research": research,
                  "expertise": expertise,
                  "interest": interests, 
                  "events" : AuthContext.data.user_metadata.events
                }
            }
        )

        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/UpdateUser/${AuthContext.data.user_id}`, { 
            method:"PATCH", 
            body: JSON.stringify(postreq),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${accessToken}`, 
            }
        })
        if(response.ok){
            console.log('fdfd')
            enqueueSnackbar('User has been updated', { variant : "success" });
            fetchData(); 
            ChangeCancel(); 
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
        AuthContext.setData(await response.json());  
    }

    function ChangeCancel(){
        AuthContext.setEdit(false)
    }

    function changeInterest(value : string | null){
        mes = ""
        if (value !== null ){
            if (interests.includes(value)){   
                console.log("Yu Blind!")
            }else{
                setInterest(state => [...state, value])
            }
        }
    }
    
    function changeExpertise(value : string | null){
        mes = ""
        if (value !== null ){
            if (expertise.includes(value)){   
                console.log("Yu Blind!")
            }else{
                setExpertise(state => [...state, value])
            }
        }
    }

    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            minHeight : '100vh', backgroundImage: `url(${mySvg})`, backgroundRepeat : "no-repeat",
            backgroundPosition : 'center bottom',
        },
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            [theme.breakpoints.down('xs')]: {
                width: theme.spacing(10),
                height: theme.spacing(10),
              },
        },
        glass : {
            backgroundColor: 'rgba(0,0,0,0.06)'            
        }
        }),
    );
    const classes = useStyles();

    
    return (
        <>
        <Box my={11}>
        </Box>
        <div className={classes.root}>
        <Grid container justify="center">
        <Grid item xs={12} lg={9}>
            <Box borderRadius={5} className={classes.glass}>
            <Grid container>
            <Grid item lg={3} xs={2}>
                <Grid container justify = "center">
                    <Box m={2}>
                    <Box className="small" borderRadius="borderRadius">
                    <Avatar alt="Profile Picture" className={classes.large} src={AuthContext.data ? AuthContext.data.picture : ""}/>
                    </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item lg={8} xs={8}>
                <Box borderRadius={2}>
                <Grid container>
                <Grid item xs={12}>
                <Grid container >
                <Box m={1}>
                    <TextField 
                    variant="outlined" 
                    label="Name" 
                    margin="dense"
                    error={name.length === 0 ? true : false }
                    onChange={e => setName(e.target.value)} 
                    defaultValue={AuthContext.data?.name}/>
                </Box>
                <Box m={2} >
                    <FormControlLabel
                     control={<Checkbox value={available} checked={available} onChange={e => setAvailable(e.target.checked)}/>}
                     label="Available for Ad Hoc Project Work"
                    />       
                </Box>
                </Grid>
    
                </Grid>
                <Grid container>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                }}>
                <Box m={1}>         
                <TextField
                    multiline
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    onChange={e => setSussexURL(e.target.value)}
                    label="Sussex URL"
                    defaultValue={sussexURL}/> 
         </Box>
    
                    <Box my={1}><SchoolIcon/></Box>
                    <Box m={1}>{AuthContext.data.user_metadata.education.graduationDate.toString().slice(4,15)} </Box>
                </div>
                </Grid>
                </Grid>
                </Box>
            </Grid>
            <Grid item lg={1} xs={1}>
                <Box m={2}><Button onClick={ChangeCancel}> <CancelIcon/> </Button></Box>
                <Box m={2}><Button onClick={UpdateUser}>  <SaveIcon/> </Button></Box>
            </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} lg={3}>
                    <Box my={7}>
                        <Points/>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={9}>
                    <Box>
                        <Box m={3} p={3} borderRadius={8} bgcolor="secondary.main">
                            <Grid container>
                            <Grid item lg={6} xs={12}>
                                <Typography><EmailIcon/> {AuthContext.data.email}</Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormControl variant="outlined" style={{minWidth: 120}}>
                                <InputLabel>School</InputLabel>
                                    <Select onChange={(e : any) => setSchool(e.target.value)} label="School" >
                                        <MenuItem value="University of Sussex Business School">University of Sussex Business School</MenuItem>
                                        <MenuItem value="School of Education and Social Work">School of Education and Social Work</MenuItem>
                                        <MenuItem value="School of Engineering and Informatics">School of Engineering and Informatics</MenuItem>
                                        <MenuItem value="School of Global Studies">School of Global Studies</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormControl variant="outlined" style={{minWidth: 150}}>
                                <InputLabel>Career Stage</InputLabel>
                                <Select 
                                defaultValue={careerStage} 
                                onChange={ (e : any) => setCareerStage(e.target.value)} 
                                label="Career Stage" >
                                <MenuItem value="UG">UG</MenuItem>
                                <MenuItem value="PhD">PhD</MenuItem>
                                <MenuItem value="PhD">PostDoc</MenuItem>
                                <MenuItem value="MSc">MSc</MenuItem>
    
                                <MenuItem value="Professional Services">Professional Services</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                    { school === "" ? 
                                        <FormControl variant="outlined" style={{minWidth: 200}} disabled>
                                        <InputLabel>Department</InputLabel>
                                        <Select /> 
                                        </FormControl> 
                                        :
                                        <Box my={2}> 
                                        <FormControl variant="outlined" style={{minWidth: 200}}>
                                        <InputLabel>Department</InputLabel>
                                            <Select
                                                onChange={(e : any) => setDepartment(e.target.value)} label="Department"
                                                >
                                                { school === "University of Sussex Business School" ?  
                                                (DepartmentObj['University of Sussex Business School'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem> 
                                                ))
                                                : school === "School of Education and Social Work" ?  
                                                (DepartmentObj['School of Education and Social Work'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))
                                                : school === "School of Engineering and Informatics" ?  
                                                (DepartmentObj['School of Engineering and Informatics'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))
                                                : school === "School of Global Studies" ?  
                                                (DepartmentObj['School of Global Studies'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))
                                                : school === "School of Law, Politics and Sociology" ?  
                                                (DepartmentObj['School of Law, Politics and Sociology'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))
                                                : school === "School of Life Sciences" ?  
                                                (DepartmentObj['School of Life Sciences'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))
                                                : school === "School of Media, Arts and Humanities" ?  
                                                (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))                                
                                                : school === "School of Media, Arts and Humanities" ?
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
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={11} lg={6}>
                    <Autocomplete
                    fullWidth
                    onChange={(event, value, reason) => changeInterest(value)}
                    id="multiple-limit-tags"
                    inputValue={mes}
                    options={AllSubjects}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Add Expertise" variant="outlined" />}
                />
                    <Box my={2}>
                        {interests.map( (e) => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e} onDelete={() => DeleteChipIntrest(e)} ></Chip>)}
                    </Box>
    
                </Grid>
                <Grid item xs={11} lg={6}>
                    <Autocomplete
                    fullWidth
                    onChange={(event, value, reason) => changeExpertise(value)}
                    id="multiple-limit-tags"
                    inputValue={mes}
                    options={AllSubjects}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Add interests" variant="outlined" />}
                />
                <Box my={2}>
                    {AuthContext.data.user_metadata.expertise.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)}
                </Box>
                
                </Grid>
            </Grid>
            </Box>
                <Grid item xs={12} alignItems="center" >
                    <Box borderRadius={5} className={classes.glass} my={4}>                        
                    <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={e => setResearch(e.target.value)}
                    label="Your research interests"
                    defaultValue={research}/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    </div>
    </>
    )
}

export default EditUserProfile
