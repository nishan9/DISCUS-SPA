import { Avatar, Box, Button, Chip, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Theme, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import Auth0user from './models/Auth0user';
import Navbar from './Navbar'
import EditIcon from '@material-ui/icons/Edit';
import DepartmentObj from './Department';
import { Autocomplete, AutocompleteChangeReason } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Auth0Context } from './context/Auth0Context';

function ViewUser(props : any) {
    const [loginPressed, setLoginPressed] = useState(false);
    const [data, setData] = useState<Auth0user>()
    const user_id = props.match.params.user_id; 
    const [editMode, setEditMode] = useState(false);
    const [interests, setInterests] = useState<string[]>([])
    const AuthContext = useContext(Auth0Context)

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData(){
        console.log(`${process.env.REACT_APP_API_URL}/UserSearch/${user_id}`); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/${user_id}`);
        setData(await response.json());
    }

    function changeEdit(){
        if (data !== undefined){
            setInterests(data?.user_metadata.interest)
        }
        setEditMode(true); 
    }

    function Cancel(){
        setEditMode(false); 
    }

    async function saveData(e : any){
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/User/`, {
            headers : {"Content-Type" : "application/json" }, 
            method:"POST", 
            body: JSON.stringify(data),
        })
        if(response.ok){
            alert("Success"); 
        }else{
            console.error("Publishing failed");
        }
    }

    function handleDelete(e : string){
        console.log(e)
    }


    function addtoState(value : { Subject : string}[], reason : AutocompleteChangeReason){
        let newTags : string [] = []; 
        setInterests(newTags); 
        setInterests(value.map ( x => x.Subject)); 
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
        {editMode ? 
            <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box pt={3} >
                        <Typography variant="h3">{data?.name}</Typography>
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
        <Grid item xs={9} >
        <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}> 
            <div>                
                <Button onClick={changeEdit}> <SaveIcon/> </Button>
                <Button onClick={Cancel}> <CancelIcon/> </Button>
                <Typography variant="body1">Name <TextField defaultValue={data?.name}/></Typography>
                <Typography variant="body1">
                    <TextField 
                        defaultValue={data?.email}
                    />
                </Typography>

                <Box my={3}>
            <FormControl variant="outlined" style={{minWidth: 120}}>
                <InputLabel>School</InputLabel>
                <Select 
                defaultValue={data?.user_metadata.education.school}
                label="School" >
                    <MenuItem value="University of Sussex Business School">University of Sussex Business School</MenuItem>
                    <MenuItem value="School of Education and Social Work">School of Education and Social Work</MenuItem>
                    <MenuItem value="School of Engineering and Informatics">School of Engineering and Informatics</MenuItem>
                    <MenuItem value="School of Global Studies">School of Global Studies</MenuItem>
                </Select>
            </FormControl>
        </Box>

        <Box my={3}> 
            <FormControl variant="outlined" style={{minWidth: 200}}>
            <InputLabel>Department</InputLabel>
                <Select
                label="Department"
                >
                {   data?.user_metadata.education.school === "University of Sussex Business School" ?  
                (DepartmentObj['University of Sussex Business School'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem> 
                ))
                : data?.user_metadata.education.school === "School of Education and Social Work" ?  
                (DepartmentObj['School of Education and Social Work'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem>
                ))
                : data?.user_metadata.education.school === "School of Engineering and Informatics" ?  
                (DepartmentObj['School of Engineering and Informatics'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem>
                ))
                : data?.user_metadata.education.school === "School of Global Studies" ?  
                (DepartmentObj['School of Global Studies'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem>
                ))
                : data?.user_metadata.education.school === "School of Law, Politics and Sociology" ?  
                (DepartmentObj['School of Law, Politics and Sociology'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem>
                ))
                : data?.user_metadata.education.school === "School of Life Sciences" ?  
                (DepartmentObj['School of Life Sciences'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem>
                ))
                : data?.user_metadata.education.school === "School of Media, Arts and Humanities" ?  
                (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem>
                ))                                
                : data?.user_metadata.education.school === "School of Media, Arts and Humanities" ?
                (DepartmentObj['School of Media, Arts and Humanities'].map (dep => 
                <MenuItem value={dep}>{dep}</MenuItem>
                ))  
                : <p></p>
                }
                </Select>
            </FormControl>
            </Box>

                <Autocomplete
                    multiple
                    fullWidth
                    onChange={(event, value, reason) => addtoState(value, reason)}
                    id="multiple-limit-tags"
                    options={Subjects}
                    getOptionLabel={(option) => option.Subject}
                    renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Add Tags" />
                    )}
                />

                {data?.user_metadata.expertise.map(e => <Chip label={e} ></Chip>)}
                
            </div>
        </Box>
        <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}>
            <div >
                <Typography variant="body1"></Typography>
                <Typography variant="body1"></Typography>
                
                <TextField id="outlined-basic"           
                    multiline
                    rows={4} 
                    fullWidth
                    label="Research" 
                    variant="outlined" 
                    defaultValue={data?.user_metadata.research}/>
                    
                {data?.user_metadata.interest.map(e => <Chip label={e}></Chip>)}
            </div>
        </Box>
    </Grid>
</Grid>
</div>
        :
        
        <Grid>
<div>
<Grid container spacing={3}>
    <Grid item xs={12}>
        <Box pt={3} >
            <Typography variant="h3">{data?.name}</Typography>
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
                {AuthContext?.data.app_metadata === null ? <></> : <p> <Button onClick={changeEdit}> <EditIcon/> </Button> </p>}
                <Typography variant="body1">Name {data?.name}</Typography>
                <Typography variant="body1">{data?.email}</Typography>
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

        }
        </div>
    )
}

const Subjects = [
    { Subject: 'Computer Stuff'},
    { Subject: 'Natural Language Engineering'},
  ];

export default ViewUser
