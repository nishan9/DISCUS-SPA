import { Grid, Box, Avatar, Button, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Checkbox, FormControlLabel, Hidden, DialogTitle, DialogContent, Dialog, Typography, DialogActions } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { AllSubjects } from '../config/TagSystem'
import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';
import Points from './Points';
import DepartmentObj from '../config/Department'; 
import EmailIcon from '@material-ui/icons/Email';
import UserTheme from '../themes/UserTheme';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import validator from 'validator';
import { SelectedUserContext } from '../context/SelectedUserContext';


function EditUser() {
    const UserContext = useContext(SelectedUserContext); 
    const history = useHistory(); 

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
    const [graduation, setGraduation] = useState(new Date()); 
    const [sussexURL, setSussexURL] = useState<string>(""); 
    const [linkedIn, setLinkedIn] = useState<string>(""); 
    const [openDelete, setOpenDelete] = useState(false); 


    const [validatedName, setValidatedName] = useState(true); 
    const [validatedSP, setValidatedSP] = useState(true); 
    const [validatedLP, setValidatedLP] = useState(true)
    let mes = ""

    useEffect(() => {
        LoadStates(); 
    }, []);

    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])

    function LoadStates(){
        if (UserContext.data !== undefined ){
            setName(UserContext.data.name); 
            setSchool(UserContext.data.user_metadata.education.school); 
            setDepartment(UserContext.data.user_metadata.education.department); 
            setCareerStage(UserContext.data.user_metadata.education.careerStage); 
            setGraduation(new Date (UserContext.data.user_metadata.education.graduationDate)); 
            setInterest(UserContext.data.user_metadata.interest); 
            setResearch(UserContext.data.user_metadata.research);
            setSussexURL(UserContext.data.user_metadata.social.sussex);
            setLinkedIn(UserContext.data.user_metadata.social.linkedIn);
            setExpertise(UserContext.data.user_metadata.expertise); 

            if (UserContext.data.user_metadata.education.available === "true")
            {
                setAvailable(true)
            }
        }
    }

    function DeleteChipIntrest(e : String){
        setInterest(interests.filter(subject => subject !== e));
    }

    function DeleteChipExpertise(e : String){
        setExpertise(expertise.filter(subject => subject !== e));
    }

    const handleDate = (date: Date) => {
        setGraduation(date)
    };

    async function Validation(){

        if ((sussexURL === "" || validator.isURL(sussexURL)) && (linkedIn  === "" ||  validator.isURL(linkedIn))) 
        {
            setValidatedSP(true);
            setValidatedLP(true);
            UpdateUser();
        } 
        else if (sussexURL === "" || validator.isURL(sussexURL) )
        {
            setValidatedSP(true);
            if (linkedIn  !== "" ||  !validator.isURL(linkedIn)){
                setValidatedLP(false);
            }
        }
        else if (linkedIn  === "" ||  validator.isURL(linkedIn))
        {
            setValidatedLP(true);
            if (sussexURL  !== "" ||  !validator.isURL(sussexURL)){
                setValidatedSP(false);
            }
        }
        else {
            setValidatedSP(false);
            setValidatedLP(false);
        }
    }

    async function UpdateUser(){

        const stravail = available.toString(); 
        const postreq = (
            {   "name" : name, 
                "user_metadata" : {
                "social": {
                    "sussex": sussexURL,
                    "linkedIn" : linkedIn,
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
                  "events" : UserContext.data.user_metadata.events
                }
            }
        )

        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/UpdateUser/${UserContext.data.user_id}`, { 
            method:"PATCH", 
            body: JSON.stringify(postreq),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${accessToken}`, 
            }
        })
        if(response.ok){
            enqueueSnackbar(`${UserContext.data.name}'s profile has been updated`, { variant : "success" });
            const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/${UserContext.data.user_id}`);
            UserContext.setData(await response.json());
            ChangeCancel(); 
        }else{
            console.error("Publishing failed");
        }
    }

    function openDeleteDialog(){
        setOpenDelete(true); 
    }

    function handleCloseDelete(){
        setOpenDelete(false); 
    }
    async function handleDelete(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Delete/${UserContext.data.user_id}`, {
            headers : {"Content-Type" : "application/json" }, 
            method:"DELETE", 
        })
        if(response.ok){
            enqueueSnackbar('User has been deleted', { variant : "success" });
            handleCloseDelete();
            history.push("/searchUsers"); 
        }else{
            enqueueSnackbar('An error occured', { variant : "error" });
        }
    }

    function ChangeCancel(){
        UserContext.setEdit(false);
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

    const classes = UserTheme(); 

    
    return (
        <form noValidate autoComplete="off">
        <Box my={4}>
        </Box>
        <Hidden xsDown>
            <Box my={7}>
            </Box>
        </Hidden>
        <div className={classes.root}>
        <Grid container justify="center" className={classes.centerMobile}>
        <Grid item xs={12} lg={9}>
            <Box borderRadius={5} className={classes.glass}>
            <Grid container className={classes.centerMobile}>
            <Grid item lg={3} xs={12}>
                <Grid container justify = "center">
                    <Box m={2}>
                        <Box className="small" borderRadius="borderRadius">
                        <   Avatar alt="Profile Picture" className={classes.large} src={UserContext.data ? UserContext.data.picture : ""}/>
                        </Box>
                    </Box>
                    <Hidden only={['lg', 'xl']}>
                        <Button onClick={ChangeCancel}> <CancelIcon/> </Button>
                        <Button onClick={Validation}>  <SaveIcon/> </Button>         
                    </Hidden>
                </Grid>
            </Grid>
            <Grid item lg={8} xs={8}>
                <Box borderRadius={2}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth
                                variant="outlined" 
                                value={name}
                                error={!validatedName}
                                helperText={validatedName ? "" : "Must be a name"}
                                label="Name" 
                                margin="dense"
                                onChange={e => setName(e.target.value)} 
                                defaultValue={UserContext.data?.name}/>
                            </Grid>
                            <Hidden xsDown>
                                <Box mx={2}></Box>
                            </Hidden>
                            <Grid item xs={12} md={5}>
                                <FormControlLabel
                                control={<Checkbox value={available} checked={available} onChange={e => setAvailable(e.target.checked)}/>}
                                label="Available for Ad Hoc Project Work"
                                />  
                            </Grid>  

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>         
                                <TextField
                                    multiline
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    error={!validatedSP}
                                    helperText={validatedSP ? "" : "Must be a valid URL or blank"}
                                    onChange={e =>  setSussexURL(e.target.value)}
                                    value={sussexURL}
                                    label="Sussex URL"
                                    defaultValue={sussexURL}/> 
                            </Grid>
                            <Hidden xsDown>
                                <Box mx={2}></Box>
                            </Hidden>
                            <Grid item xs={12} md={5}>         
                                <TextField
                                    multiline
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    error={!validatedLP}
                                    helperText={validatedLP ? "" : "Must be a valid URL or blank"}
                                    value={linkedIn}
                                    onChange={e => setLinkedIn(e.target.value)}
                                    label="LinkedIn URL"
                                    defaultValue={linkedIn}/> 
                            </Grid>
                            <Grid item xs={12} md={5} >         
                                <Box m={1}>{} </Box>
                                <div style={{ width : '100%'}}>
                                    <Box>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                         margin="normal"
                                         id="date-picker-dialog"
                                         label="Graduation Date"
                                         format="MM/dd/yyyy"
                                         defaultValue={graduation}
                                         value={graduation}
                                         onChange={(e : any) => handleDate(e)}
                                         KeyboardButtonProps={{
                                         'aria-label': 'change date',
                                         }}
                                        />
                                        </MuiPickersUtilsProvider>
                                    </Box>
                                    </div>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Box>
            </Grid>
            <Hidden mdDown>
                <Grid item lg={1} xs={1}>
                    <Box m={2}><Button onClick={ChangeCancel}> <CancelIcon/> </Button></Box>
                    <Box m={2}><Button onClick={Validation}>  <SaveIcon/> </Button></Box>
                </Grid>
            </Hidden>
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
                            <Grid container justify="center">
                            <Hidden xsDown>
                                <Grid item lg={6} xs={12}>
                                    <Box className={classes.centerSVG}> <EmailIcon/> {UserContext.data.email}</Box>
                                </Grid>
                            </Hidden>

                            <Hidden only={['lg', 'xl', 'md', 'sm']}>
                                <Grid item lg={6} xs={12}>
                                    <Grid container justify="center">
                                        <Box className={classes.centerSVG}> <EmailIcon/> {UserContext.data.email}</Box>
                                    </Grid>
                                </Grid>
                            </Hidden>

                            <Grid item lg={6} xs={12} >
                                <FormControl variant="outlined" margin="dense" size="small" style={{minWidth: 120}}>
                                <InputLabel>School</InputLabel>
                                    <Select onChange={(e : any) => setSchool(e.target.value)} label="School" >
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
                                        <MenuItem value="Doctoral School and Research groups">Doctoral School and Research groups</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <FormControl variant="outlined" margin="dense" size="small" style={{minWidth: 150}}>
                                <InputLabel>Career Stage</InputLabel>
                                    <Select 
                                    defaultValue={careerStage} 
                                    onChange={ (e : any) => setCareerStage(e.target.value)} 
                                    label="Career Stage" >
                                    <MenuItem value="UG">UG</MenuItem>
                                    <MenuItem value="PhD">PhD</MenuItem>
                                    <MenuItem value="Faculty">Faculty</MenuItem>
                                    <MenuItem value="Postdoc">Postdoc</MenuItem>
                                    <MenuItem value="MSc">MSc</MenuItem>
                                    <MenuItem value="Professional Services">Professional Services</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                    { school === "" ? 
                                        <FormControl variant="outlined"  margin="dense" size="small" style={{minWidth: 200}} disabled>
                                        <InputLabel>Department</InputLabel>
                                        <Select /> 
                                        </FormControl> 
                                        :
                                        <FormControl variant="outlined"  margin="dense" size="small" style={{minWidth: 200}}>
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
                                                : school === "School of Mathematical and Physical Sciences" ?  
                                                (DepartmentObj['School of Mathematical and Physical Sciences'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))                                
                                                : school === "School of Media, Arts and Humanities" ?
                                                (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))  
                                                : school === "School of Psychology" ?
                                                (DepartmentObj['School of Psychology'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))  
                                                : school === "Brighton and Sussex Medical School" ?
                                                (DepartmentObj['Brighton and Sussex Medical School'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))  
                                                : school === "Doctoral School and Research groups" ?
                                                (DepartmentObj['Doctoral School and Research groups'].map (dep => 
                                                <MenuItem value={dep}>{dep}</MenuItem>
                                                ))  
                                                : <p></p>
                                                }
                                            </Select>
                                        </FormControl>
                                    }
    
                            </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={11} lg={6} style={{ padding : '10px'}}>
                    <Autocomplete
                    fullWidth
                    onChange={(event, value, reason) => changeExpertise(value)}
                    inputValue={mes}
                    options={AllSubjects}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} margin="dense" label="Add Expertise" variant="outlined" />}
                />
                <Box my={2}>
                    {expertise.map( (e) => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e} onDelete={() => DeleteChipExpertise(e)} ></Chip>)}
                </Box>
                
                </Grid>
                <Grid item xs={11} lg={6} style={{ padding : '10px'}}>
                    <Autocomplete
                    fullWidth
                    onChange={(event, value, reason) => changeInterest(value)}
                    inputValue={mes}
                    options={AllSubjects}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} margin="dense" label="Add Interests" variant="outlined" />}
                />
                    <Box my={2}>
                        {interests.map( (e) => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e} onDelete={() => DeleteChipIntrest(e)} ></Chip>)}
                    </Box>
    
                </Grid>
            </Grid>
            </Box>
                <Grid container justify="center">
                <Grid item xs={11} lg={12} alignItems="center">
                    <Box borderRadius={5} className={classes.glass}  mt={5} mb={2}>                        
                        <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        onChange={e => setResearch(e.target.value)}
                        label="Your research interests"
                        defaultValue={research}/>
                    </Box>
                    
                    <Grid container justify="center" style={{padding : '4px'}}>
                    <Button
                    style={{ backgroundColor : 'red', fontSize : "15px"}}
                    variant="contained"
                    onClick={e => openDeleteDialog()}
                    startIcon={<DeleteIcon style={{ fontSize : "25px"}} />}
                    >Delete Profile</Button>
                    </Grid>
                    <Box mb={8}></Box>
                </Grid>
                </Grid>

                <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign : 'center'}}>
                    <Typography variant="h5">Are you sure you want to delete</Typography>
                    <Typography variant="h5"> your profile?</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleDelete()} variant="contained" style={{ backgroundColor : 'red'}}> Delete User Profile </Button>
                    <Button onClick={() => handleCloseDelete()} variant="contained" color="secondary"> Cancel </Button>
                </DialogActions>
                </Dialog>                  

            </Grid>
        </Grid>
    </div>
    </form>
    )
}

export default EditUser