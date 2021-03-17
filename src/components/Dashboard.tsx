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
import SchoolIcon from '@material-ui/icons/School';
import IsAvailable from './IsAvailable';
import uosLogo from '../assets/logo.svg'; 
import Loading from '../config/Loading';

function Dashboard() {
    
    const AuthContext = useContext(Auth0Context);
    const drawerWidth = 140;

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                minHeight : '100vh', backgroundImage: `url(${mySvg})`, backgroundRepeat : "no-repeat",
                backgroundPosition : 'center bottom',
                padding : '1px',
            },
            large: {
                width: theme.spacing(15),
                height: theme.spacing(15),
                [theme.breakpoints.down('xs')]: {
                    width: theme.spacing(10),
                    height: theme.spacing(10),
                  },
            },
            glass : {
                backgroundColor: 'rgba(0,0,0,0.02)',
                border : '1px solid rgba(0,0,0,0.05)', 
                padding : '50px', 
                [theme.breakpoints.down('xs')]: {
                    padding : 0
                  },          
            }
            }),
        );
    const classes = useStyles();


    function changeEdit(){
        AuthContext.setEdit(true); 
    }

    return (<>
    {AuthContext.data.name !== "" ? 
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
                        {
                        AuthContext.data.user_metadata.social.sussex === "" ? 
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
                         
                       
                        
                        <Box my={1}><SchoolIcon/></Box>
                        <Box m={1}>{AuthContext.data.user_metadata.education.graduationDate.toString().slice(4,15)} </Box>
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
                                    <Typography><DomainIcon/> {AuthContext.data.user_metadata.education.school}</Typography>
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                    <Typography><PersonIcon/> {AuthContext.data.user_metadata.education.careerStage}</Typography>
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                    <Typography><DomainIcon/> {AuthContext.data.user_metadata.education.department}</Typography>
                                    </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={11} lg={6}>
                            <Typography>Expertise : {AuthContext.data.user_metadata.expertise.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                        </Grid>
                        <Grid item xs={11} lg={6}>
                            <Typography>Interest : {AuthContext.data.user_metadata.interest.map(e => <Chip color='primary' style={{backgroundColor:'#24CAC3', margin : 2}} label={e}></Chip>)} </Typography>
                        </Grid>
                    </Grid>
                    </Box>
                        <Grid item xs={12} alignItems="center" >
                            <Box borderRadius={5} className={classes.glass} my={4}>
                                <Typography gutterBottom > Research from {AuthContext.data.name}</Typography>
                                <Typography>{AuthContext.data.user_metadata.research}</Typography>
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