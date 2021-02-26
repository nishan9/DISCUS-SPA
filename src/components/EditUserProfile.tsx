import { Grid, Box, Typography, Avatar, Button, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Checkbox } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Auth0Context } from '../context/Auth0Context';
import { AllSubjects } from './TagSystem';
import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';
import Points from './Points';
import DepartmentObj from './Department';

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
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box pt={3} >
                    <Typography variant="h3">Edit Mode</Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box className="small" m={2} p={6} borderRadius="borderRadius">
                    <Avatar alt="Remy Sharp" src={AuthContext.data ? AuthContext.data.picture : ""}/>
                </Box>
                <Points/>
            </Grid>
            <Grid item xs={8} >
                <Box borderRadius="borderRadius" m={2} p={3}> 
                    <div>
                        <Button onClick={ChangeCancel}> <CancelIcon/> </Button>
                        <Button onClick={UpdateUser}>  <SaveIcon/> </Button>
                        <Typography variant="h4"></Typography>
                        <Typography variant="body1">
                            
                    <TextField 
                        variant="outlined" 
                        label="Name" 
                        error={name.length === 0 ? true : false }
                        onChange={e => setName(e.target.value)} 
                        defaultValue={AuthContext.data?.name}/>
                    </Typography>
               
                    <TextField
                     multiline
                     variant="outlined"
                     fullWidth
                     onChange={e => setSussexURL(e.target.value)}
                     label="Sussex URL"
                     defaultValue={sussexURL}/>


                    <TextField
                     multiline
                     rows={4}
                     variant="outlined"
                     fullWidth
                     onChange={e => setResearch(e.target.value)}
                     label="research"
                     defaultValue={research}/>

                     <Typography>Available?</Typography> <Checkbox value={available} checked={available} onChange={e => setAvailable(e.target.checked)}/>

                    <Box m={1}>
                        <Typography color={"secondary"}> Leave blank if you do not wish to change</Typography>
                    </Box>

                    <Grid container direction="row" alignItems="center">

                    <Box my={3}>
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
                    </Box>



                <Box my={1} mr={3}>
                <FormControl variant="outlined" style={{minWidth: 120}}>
                <InputLabel>School</InputLabel>
                    <Select onChange={(e : any) => setSchool(e.target.value)} label="School" >
                    <MenuItem value="University of Sussex Business School">University of Sussex Business School</MenuItem>
                    <MenuItem value="School of Education and Social Work">School of Education and Social Work</MenuItem>
                    <MenuItem value="School of Engineering and Informatics">School of Engineering and Informatics</MenuItem>
                    <MenuItem value="School of Global Studies">School of Global Studies</MenuItem>
                    </Select>
                </FormControl>
                </Box>

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
                        onChange={(e : any) => setDepartment(e.target.value)}
                        label="Department"
                        >
                        {   school === "University of Sussex Business School" ?  
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

                    <Box my={3}>
                        <Autocomplete
                            fullWidth
                            onChange={(event, value, reason) => changeInterest(value)}
                            id="multiple-limit-tags"
                            inputValue={mes}
                            options={AllSubjects}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} label="Add interests" variant="outlined" />}
                        />
                        {interests.map( (e) => <Chip label={e} onDelete={() => DeleteChipIntrest(e)} ></Chip>)}
                    </Box>

                    <Box my={3}>
                        <Autocomplete
                            fullWidth
                            onChange={(event, value, reason) => changeExpertise(value)}
                            id="multiple-limit-tags"
                            inputValue={mes}
                            options={AllSubjects}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} label="Add interests" variant="outlined" />}
                        />
                        {expertise.map( (e) => <Chip label={e} onDelete={() => DeleteChipExpertise(e)} ></Chip>)}
                    </Box>
                    </div>

                </Box>


            </Grid>
        </Grid>
    )
}

export default EditUserProfile
