import { Avatar, Box, Button, Chip, Grid, Hidden, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import Auth0user from '../models/Auth0user';
import EditIcon from '@material-ui/icons/Edit';
import { Auth0Context } from '../context/Auth0Context'
import IsAvailable from './IsAvailable';
import Loading from '../config/Loading';
import EmailIcon from '@material-ui/icons/Email';
import SchoolIconScout from '../assets/school.svg';
import CareerStageIconScout from '../assets/briefcase.svg'; 
import PersonIcon from '@material-ui/icons/Person';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SchoolIcon from '@material-ui/icons/School';
import uosLogo from '../assets/logo.svg'; 
import EditUser from './EditUser';
import { SelectedUserContext } from '../context/SelectedUserContext';
import UserTheme from '../themes/UserTheme';
import Moment from 'react-moment';
import { useAuth0 } from '@auth0/auth0-react';

function ViewUser(props : any) {

    const Authcontext = useContext(Auth0Context)
    const Auth0 = useAuth0();    
    const UserContext = useContext(SelectedUserContext); 
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        fetchData();
    }, [Auth0, accessToken])

    async function fetchData(){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/${props.match.params.user_id}`, { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        UserContext.setData(await response.json());
    }

    function changeEdit(){
        UserContext.setEdit(true); 
    }

    const classes = UserTheme();
    
    return (
        <>
        {UserContext.edit ? <EditUser/> : 
            <>
            {UserContext.data ? 
                              <>
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
                                      <Grid item lg={4} xs={9}>
                                          <Grid container justify = "center">
                                              <Box m={2}>
                                                  <Box className="small" borderRadius="borderRadius">
                                                  <Avatar alt="Profile Picture" className={classes.large} src={UserContext.data ? UserContext.data.picture : ""}/>
                                                  </Box>
                                              </Box>
                                              <Hidden only={['md', 'lg', 'xl', 'sm']}>
                                                {Authcontext.data.app_metadata !== null ?         
                                                    <Button onClick={changeEdit}> <EditIcon/> </Button>
                                                    : 
                                                    <></>
                                                }
                                              </Hidden>
                                          </Grid>
                  
                                      </Grid>
                  
                                      <Grid item lg={8} xs={8} className={classes.centerMobile}>
                                          <Box borderRadius={2}>
                                          <Grid container className={classes.centerMobile}>
                                          <Grid item xs={11} className={classes.centerMobile}>
                                          <Grid container className={classes.centerMobile}>
                                          <Box my={1}>
                                              <Typography variant="h4"> {UserContext.data.name} </Typography>
                                          </Box>
                                          <Box m={2} >
                                              {UserContext.data.user_metadata.education.available === 'true' ? <IsAvailable/> : ""}
                                          </Box>
                                          </Grid>
                                          
                  
                                          </Grid>
                                          <Hidden xsDown>
                                              <Grid item lg={1} xs={1}>
                                                  <Box m={2}>
                                                    { Authcontext.data.app_metadata !== null ?         
                                                        <Button onClick={changeEdit}> <EditIcon/> </Button>
                                                        : 
                                                        <></>
                                                    }
                                                    </Box>
                                              </Grid>
                                          </Hidden>
                                          <Grid container className={classes.centerMobile}>
                                          <div className={classes.centerSVG}>
                                          {
                                          UserContext.data.user_metadata.social.sussex === "" ? 
                                              <></>
                                              :
                                              <a href={UserContext.data.user_metadata.social.sussex} target="_blank" rel="noopener noreferrer">
                                              <Box mr={2}><img src={uosLogo} alt="UoS Logo"  height='25px' width='30px' /></Box> 
                                          </a>
                                          }                        
                              
                                          {UserContext.data.user_metadata.social.linkedIn === "" ?  
                                              <></> 
                                              :
                                              <Box mr={2}>
                                                  <a href={UserContext.data.user_metadata.social.linkedIn} target="_blank" rel="noopener noreferrer"> 
                                                      <LinkedInIcon/>
                                                  </a>
                                              </Box>
                                          }
                                          <Box my={1}><SchoolIcon/></Box>
                                          <Box m={1}><Moment format="MMMM Do YYYY">{UserContext.data.user_metadata.education.graduationDate.toString()}</Moment></Box>
                                          </div>
                                          </Grid>
                                          </Grid>
                                          </Box>
                                      </Grid>
                                      </Grid>
                                      <Grid container>
                                          <Grid item xs={12} lg={4}>
                                              <Grid container justify="center">
                                                  <Grid item xs={9}>
                                                      <Box pb={2}>
                                                        <Box  m={1} p={3} bgcolor="primary.main" borderRadius="borderRadius" textAlign="center">
                                                        <Typography>{UserContext.data.user_metadata.events.length} Experience</Typography>
                                                        </Box>                                                     
                                                    </Box>
                                                  </Grid>
                                              </Grid>
                                          </Grid>
                                          <Grid item xs={12} lg={8}>
                                                  <Box mx={3} p={4} borderRadius={8} bgcolor="secondary.main">
                                                      <Grid container>
                                                          <Grid item lg={5} xs={12}>
                                                              <Box className={classes.centerSVG}>
                                                                  <img src={CareerStageIconScout} alt="School Icon"  height='25px' width='25px' />
                                                                  <Box mx={0.5}>
                                                                  </Box>
                                                                  <Typography>{UserContext.data.user_metadata.education.careerStage}</Typography>
                                                              </Box>  
                                                          </Grid>
                                                          <Grid item lg={7} xs={12}>
                                                              <Box className={classes.centerSVG}>
                                                                  <EmailIcon/>
                                                                  <Box mx={0.5}>
                                                                  </Box>
                                                                  <Typography>{UserContext.data.email}</Typography>
                                                              </Box> 
                                                          </Grid>
                                                          <Grid item lg={5} xs={12}>
                                                              <Box className={classes.centerSVG}>
                                                                  <PersonIcon/>
                                                                  <Box mx={0.5}>
                                                                      <Typography>{UserContext.data.user_metadata.education.department}</Typography>
                                                                  </Box>
                                                              </Box> 
                                                          </Grid>
                                                          <Grid item lg={7} xs={12}>
                                                              <Box className={classes.centerSVG}>
                                                                  <img src={SchoolIconScout} alt="School Icon"  height='25px' width='25px' />
                                                                  <Box mx={0.5}>
                                                                  </Box>
                                                                  <Typography>{UserContext.data.user_metadata.education.school}</Typography>
                                                              </Box> 
                                                          </Grid>
                                                      </Grid>
                                                  </Box>
                                          </Grid>
                                      </Grid>
                                      <Grid container>
                                          <Grid item xs={11} lg={6}>
                                              <Box mt={2} className={classes.mobilePadding}>
                                                  <Typography>Expertise : {UserContext.data.user_metadata.expertise.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                                              </Box>
                                          </Grid>
                                          <Grid item xs={11} lg={6}>
                                              <Box mt={2} className={classes.mobilePadding}>
                                                  <Typography>Interest : {UserContext.data.user_metadata.interest.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                                              </Box>
                                          </Grid>
                                      </Grid>
                                      </Box>
                                          <Grid item xs={12}  className={classes.mobilePadding}>
                                              <Box borderRadius={5} className={classes.glass} my={4} >
                                                  <Box p={2}>
                                                      <Typography variant="h6" gutterBottom > Research from {UserContext.data.name}</Typography>
                                                      <Box bgcolor="#FAFAFA" p={1} borderRadius={3}>
                                                          <Typography>{UserContext.data.user_metadata.research}</Typography>
                                                      </Box>
                                                  </Box>
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
