import { Grid, Box, Typography, Avatar, Button, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Auth0Context } from '../context/Auth0Context';
import { AllSubjects } from './TagSystem';

function EditUserProfile() {
    const AuthContext = useContext(Auth0Context);
    const [name, setName] = useState<string>(""); 

    //Editable Fields
    const [school, setSchool] = useState<string>(""); 
    const [department, setDepartment] = useState<string>(""); 
    const [careerStage, setCareerStage] = useState<string>(""); 
    const [research, setResearch] = useState<string>(""); 
    const [interests, setInterest] = useState<String[]>([]); 
    const [expertise, setExpertise] = useState<String[]>([]); 
    const [available, setAvailable] = useState<string>(""); 
    const [graduation, setGraduation] = useState<string>(""); 
    const [sussexURL, setSussexURL] = useState<string>(""); 
    let mes = ""

    useEffect(() => {
        LoadStates(); 
    }, [])

    function LoadStates(){
        if (AuthContext.data !== undefined ){
            setName(AuthContext.data.name); 
            setSchool(AuthContext.data.user_metadata.education.school); 
            setDepartment(AuthContext.data.user_metadata.education.department); 
            setCareerStage(AuthContext.data.user_metadata.education.careerStage); 
            setGraduation(AuthContext.data.user_metadata.education.graduationDate)
            setAvailable(AuthContext.data.user_metadata.education.available)
            setInterest(AuthContext.data.user_metadata.interest); 
            setResearch(AuthContext.data.user_metadata.research);
            setSussexURL(AuthContext.data.user_metadata.social.sussex)
            setExpertise(AuthContext.data.user_metadata.expertise); 
        }
    }

    function DeleteChipIntrest(e : String){
        setInterest(interests.filter(subject => subject !== e))
    }

    function DeleteChipExpertise(e : String){
        setExpertise(expertise.filter(subject => subject !== e))
    }

    async function UpdateUser(){
        const postreq = (
            { "user_metadata" : {
                "social": {
                    "sussex": sussexURL,
                  },
                  "education": {
                    "School": school,
                    "Department": department,
                    "CareerStage": careerStage,
                    "GraduationDate": graduation,
                    "Available": available
                  },
                  "research": research,
                  "expertise": expertise,
                  "interest": interests, 
                }
            }
        )
        console.log(postreq);
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
                <Box m={1} p={2} bgcolor="info.main" borderRadius="borderRadius">
                    <Typography variant="h3">Points</Typography>
                    <Typography variant="h4">5 Points</Typography>
                </Box>
            </Grid>
            <Grid item xs={8} >
                <Box borderRadius="borderRadius" m={2} p={3}> 
                    <div>
                        <Button onClick={ChangeCancel}> <CancelIcon/> </Button>
                        <Button onClick={UpdateUser}>  <SaveIcon/> </Button>
                        <Typography variant="h4"></Typography>
                        <Typography variant="body1"><TextField variant="outlined" defaultValue={AuthContext.data?.name}/></Typography>
                    </div>
                    <div >

                    <TextField
                     multiline
                     variant="outlined"
                     fullWidth
                     onChange={e => setResearch(e.target.value)}
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

                <Box my={3}>
                    <FormControl variant="outlined" style={{minWidth: 150}}>
                    <InputLabel>Career Stage</InputLabel>
                        <Select 
                        disabled
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
