import { Grid, Box, Typography, Avatar, Button, Chip, makeStyles, createStyles, Theme, Paper, CssBaseline } from '@material-ui/core'
import React, { useContext } from 'react'
import { Auth0Context } from '../context/Auth0Context'
import EditIcon from '@material-ui/icons/Edit';
import Points from '../components/Points'; 
import lottie from '../config/lottie.json'
import { Player } from "@lottiefiles/react-lottie-player";
import mySvg from '../assets/Wave.svg';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import DomainIcon from '@material-ui/icons/Domain';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SnoozeIcon from '@material-ui/icons/Snooze';
import IsAvailable from './IsAvailable';
import uosLogo from '../assets/logo.svg'; 

function Dashboard() {
    
    const AuthContext = useContext(Auth0Context);
    const drawerWidth = 140;

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                minHeight : '100vh', backgroundImage: `url(${mySvg})`, backgroundRepeat : "no-repeat",
                backgroundPosition : 'center bottom'
            },
            large: {
                width: theme.spacing(15),
                height: theme.spacing(15),
            },
            glass : {
                backgroundColor: 'rgba(0,0,0,0.06)'            
            }
            }),
        );
    const classes = useStyles();


    function changeEdit(){
        AuthContext.setEdit(true); 
    }

    return (<>
    {AuthContext.data ? 
            <div className={classes.root} > 
            <Grid container>
                <Grid item xs={12}>
                        <Box mx={20} my={7} p={4} borderRadius={5} className={classes.glass}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Grid container justify = "center">
                                        <Box m={2}>
                                            <Box className="small" borderRadius="borderRadius">
                                            <Avatar alt="Profile Picture" className={classes.large} src={AuthContext.data ? AuthContext.data.picture : ""}/>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box borderRadius={2}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container >
                                                    <Box m={1}>
                                                        <Typography variant="h4"> {AuthContext.data.name} </Typography>
                                                    </Box>
                                                    <Box m={2} >
                                                        {AuthContext.data.user_metadata.education.available === 'true' ? <IsAvailable/> : ""}
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                            <Grid container>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                }}>
                                                    <Box m={1}> <SnoozeIcon/></Box>
                                                    <Box m={1}> {AuthContext.data.user_metadata.education.graduationDate.toString().slice(4,15)} </Box>
                                                    <Box m={1}><LinkedInIcon/> </Box>
                                                    <Box m={1}><img src={uosLogo} alt="UoS Logo"  height='25px' width='30px' /></Box>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={1}>
                                    <Box m={2}><Button onClick={changeEdit}> <EditIcon/> </Button></Box>
                                </Grid>
                            </Grid>
                            <Grid container  spacing={4}>
                                <Grid item xs={3}>
                                    <Box my={7}>
                                        <Points/>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Box>
                                        <Box m={5} p={3} borderRadius={8} bgcolor="secondary.main">
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography><EmailIcon/> {AuthContext.data.email}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography><DomainIcon/> {AuthContext.data.user_metadata.education.school}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography><PersonIcon/> {AuthContext.data.user_metadata.education.careerStage}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography><DomainIcon/> {AuthContext.data.user_metadata.education.department}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid container>
                                <Grid item xs={6}>
                                    <Typography>Expertise : {AuthContext.data.user_metadata.expertise.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                                    
                                </Grid>
                                <Grid item xs={6}>
                                <Typography>Interest : {AuthContext.data.user_metadata.interest.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                                    
                                </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box mx={20} p={4} borderRadius={5} className={classes.glass}>
                            <Typography> Research from {AuthContext.data.name}</Typography>
                            <Box my={2} borderRadius="borderRadius">
                                <Typography>{AuthContext.data.user_metadata.research}</Typography>
                            </Box>
                        </Box>
                    </Grid>

            </Grid>
            <CssBaseline/>
            </div>
    :
        <Player
        autoplay
        loop
        src={lottie}
        style={{ height: "300px", width: "300px" }}>
        </Player>
    }
        </>
    )
}

export default Dashboard
