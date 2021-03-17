import { Avatar, Box, Button, Chip, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Theme, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import Auth0user from '../models/Auth0user';
import EditIcon from '@material-ui/icons/Edit';
import { Autocomplete, AutocompleteChangeReason } from '@material-ui/lab';
import { Auth0Context } from '../context/Auth0Context'
import IsAvailable from './IsAvailable';
import Loading from '../config/Loading';
import Wave from '../assets/Wave.svg';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import DomainIcon from '@material-ui/icons/Domain';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SchoolIcon from '@material-ui/icons/School';
import uosLogo from '../assets/logo.svg'; 
import EditUser from './EditUser';
import { SelectedUserContext } from '../context/SelectedUserContext';

function ViewUser(props : any) {

    const [loginPressed, setLoginPressed] = useState(false);
    const user_id = props.match.params.user_id; 
    const [editMode, setEditMode] = useState(false);
    const [interests, setInterests] = useState<string[]>([])
    const UserContext = useContext(SelectedUserContext); 

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/${user_id}`);
        UserContext.setData(await response.json());
    }

    function changeEdit(){
        if (UserContext.data !== undefined){
            setInterests(UserContext.data?.user_metadata.interest)
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
            body: JSON.stringify(UserContext.data),
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
                minHeight : '100vh', backgroundImage: `url(${Wave})`, backgroundRepeat : "no-repeat",
                backgroundPosition : 'center bottom',
                padding : '1px',
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
        {editMode ? <EditUser id={UserContext.data?.user_id}/> : 
            <>
            {UserContext.data ? 
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
                                    <Avatar alt="Profile Picture" className={classes.large} src={UserContext.data ? UserContext.data.picture : ""}/>
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
                                                <Typography variant="h4"> {UserContext.data.name} </Typography>
                                            </Box>
                                            <Box m={2} >
                                                {UserContext.data.user_metadata.education.available === 'true' ? <IsAvailable/> : ""}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                <Grid container>
                                <div style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 flexWrap: 'wrap',
                                }}>
                                
                                { UserContext.data.user_metadata.social.sussex !== null ?      
                                    <>
                                        <a href={UserContext.data.user_metadata.social.sussex} target="_blank" rel="noopener noreferrer">
                                            <Box m={1}><img src={uosLogo} alt="UoS Logo"  height='25px' width='30px' /></Box>
                                        </a>
                                    </>
                                    :
                                    <>
                                    </>
                                }
        
                                { UserContext.data.user_metadata.social.linkedIn !== null ?
                                    <>
                                        <a href={UserContext.data.user_metadata.social.linkedIn} target="_blank" rel="noopener noreferrer">
                                            <LinkedInIcon/>
                                        </a>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                
                                <Box my={1}><SchoolIcon/></Box>
                                <Box m={1}>{UserContext.data.user_metadata.education.graduationDate.toString().slice(4,15)} </Box>
                                </div>
                                </Grid>
                                </Grid>
                                </Box>
                            </Grid>
                            <Grid item lg={1} xs={1}>
                                <Box m={2}><Button onClick={changeEdit}> <EditIcon/> </Button></Box>
                            </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} lg={3}>
                                    <Box my={7}>
                                    <Box m={1} p={3} bgcolor="primary.main" borderRadius="borderRadius">
                                        <Typography>{UserContext.data.user_metadata.events.length} Experience</Typography>
                                    </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={9}>
                                    <Box>
                                        <Box m={3} p={3} borderRadius={8} bgcolor="secondary.main">
                                            <Grid container>
                                            <Grid item lg={6} xs={12}>
                                            <Typography><EmailIcon/> {UserContext.data.email}</Typography>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                            <Typography><DomainIcon/> {UserContext.data.user_metadata.education.school}</Typography>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                            <Typography><PersonIcon/> {UserContext.data.user_metadata.education.careerStage}</Typography>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                            <Typography><DomainIcon/> {UserContext.data.user_metadata.education.department}</Typography>
                                            </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={11} lg={6}>
                                    <Typography>Expertise : {UserContext.data.user_metadata.expertise.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                                </Grid>
                                <Grid item xs={11} lg={6}>
                                    <Typography>Interest : {UserContext.data.user_metadata.interest.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                                </Grid>
                            </Grid>
                            </Box>
                                <Grid item xs={12} alignItems="center" >
                                    <Box borderRadius={5} className={classes.glass} my={4}>
                                        <Typography gutterBottom > Research from {UserContext.data.name}</Typography>
                                        <Typography>{UserContext.data.user_metadata.research}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    </>
            :
                <Loading/>
            }
            </>
            }
        </>
    )
}

export default ViewUser
