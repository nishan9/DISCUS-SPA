import { Grid, Box, Typography, Avatar, Button, Chip, Hidden, Tooltip } from '@material-ui/core'
import React, { useContext } from 'react'
import { Auth0Context } from '../context/Auth0Context'
import EditIcon from '@material-ui/icons/Edit';
import Points from '../components/Points'; 
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SchoolIcon from '@material-ui/icons/School';
import IsAvailable from './IsAvailable';
import uosLogo from '../assets/logo.svg'; 
import Loading from '../config/Loading';
import SchoolIconScout from '../assets/school.svg';
import CareerStageIconScout from '../assets/briefcase.svg'; 
import UserTheme from '../themes/UserTheme'; 
import Moment from 'react-moment';
function Dashboard() {
    
    const AuthContext = useContext(Auth0Context);
    const classes = UserTheme();

    //Uses the context to trigger the edit component allowing users to edit user profile. 
    function changeEdit(){
        AuthContext.setEdit(true); 
    }

    return (<>
    {AuthContext.data.name !== "" ? 
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
                                    <Avatar alt="Profile Picture" className={classes.large} src={AuthContext.data ? AuthContext.data.picture : ""}/>
                                </Box>
                            </Box>
                            <Hidden only={['md', 'lg', 'xl', 'sm']}>
                            <Button onClick={changeEdit}> <EditIcon/> </Button>
                            </Hidden>
                        </Grid>

                    </Grid>

                    <Grid item lg={8} xs={8} className={classes.centerMobile}>
                        <Box borderRadius={2}>
                        <Grid container className={classes.centerMobile}>
                        <Grid item xs={11} className={classes.centerMobile}>
                            <Grid container className={classes.centerMobile}>
                                <Box my={1}>
                                    <Typography variant="h4"> {AuthContext.data.name} </Typography>
                                </Box>
                                <Box m={2} >
                                    {AuthContext.data.user_metadata.education.available === 'true' ? <IsAvailable/> : ""}
                                </Box>
                            </Grid>
                        </Grid>
                        <Hidden xsDown>
                            <Grid item lg={1} xs={1}>
                                <Box m={2}>
                                    <Tooltip title="Edit profile">
                                        <Button onClick={changeEdit}> <EditIcon/> </Button>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Hidden>
                        <Grid container className={classes.centerMobile}>
                        <div className={classes.centerSVG}>
                            { AuthContext.data.user_metadata.social.sussex === "" ? 
                            <></>
                            :
                            <a href={AuthContext.data.user_metadata.social.sussex} target="_blank" rel="noopener noreferrer">
                                <Box mr={2}><img src={uosLogo} alt="UoS Logo"  height='25px' width='30px' /></Box> 
                            </a> 
                            }                        
            
                            {AuthContext.data.user_metadata.social.linkedIn === "" ?  
                            <></> 
                            :
                            <Box mr={2}>
                                <a href={AuthContext.data.user_metadata.social.linkedIn} target="_blank" rel="noopener noreferrer"> 
                                    <LinkedInIcon/>
                                </a>
                            </Box>
                            }
                            <Box my={1}><Tooltip title="Graduation Date"><SchoolIcon/></Tooltip></Box>
                            <Box m={1}><Moment format="MMMM Do YYYY">{AuthContext.data.user_metadata.education.graduationDate.toString()}</Moment></Box>
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
                                        <Tooltip title="Experience Points are calculated form how many events you attend.">
                                            <Box>
                                                <Points/>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                                <Box mx={3} p={4} borderRadius={8} bgcolor="primary.light">
                                    <Grid container>
                                        <Grid item lg={5} xs={12}>
                                            <Box className={classes.centerSVG}>
                                                <img src={CareerStageIconScout} alt="School Icon"  height='25px' width='25px' />
                                                <Box mx={0.5}>
                                                </Box>
                                                <Typography>{AuthContext.data.user_metadata.education.careerStage}</Typography>
                                            </Box>  
                                        </Grid>
                                        <Grid item lg={7} xs={12}>
                                            <Box className={classes.centerSVG}>
                                                <EmailIcon/>
                                                <Box mx={0.5}>
                                                </Box>
                                                <Typography>{AuthContext.data.email}</Typography>
                                            </Box> 
                                        </Grid>
                                        <Grid item lg={5} xs={12}>
                                            <Box className={classes.centerSVG}>
                                                <PersonIcon/>
                                                <Box mx={0.5}>
                                                    <Typography>{AuthContext.data.user_metadata.education.department}</Typography>
                                                </Box>
                                            </Box> 
                                        </Grid>
                                        <Grid item lg={7} xs={12}>
                                            <Box className={classes.centerSVG}>
                                                <img src={SchoolIconScout} alt="School Icon"  height='25px' width='25px' />
                                                <Box mx={0.5}>
                                                </Box>
                                                <Typography>{AuthContext.data.user_metadata.education.school}</Typography>
                                            </Box> 
                                        </Grid>
                                    </Grid>
                                </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={11} lg={6}>
                            <Box mt={2} className={classes.mobilePadding}>
                                <Typography>Expertise : {AuthContext.data.user_metadata.expertise.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={11} lg={6}>
                            <Box mt={2} className={classes.mobilePadding}>
                                <Typography>Interest : {AuthContext.data.user_metadata.interest.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    </Box>
                        <Grid item xs={12}  className={classes.mobilePadding}>
                            <Box borderRadius={5} className={classes.glass} my={4} >
                                <Box p={2}>
                                    <Typography variant="h6" gutterBottom > Research from {AuthContext.data.name}</Typography>
                                    <Box bgcolor="#FAFAFA" p={1} borderRadius={3}>
                                        <Typography>{AuthContext.data.user_metadata.research}</Typography>
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
    )
}

export default Dashboard