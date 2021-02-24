import { Grid, Box, Typography, Avatar, Button, Chip, makeStyles, createStyles, Theme } from '@material-ui/core'
import React, { useContext } from 'react'
import { Auth0Context } from './context/Auth0Context'
import EditIcon from '@material-ui/icons/Edit';
import Points from './components/Points';

function Dashboard() {
    
    const AuthContext = useContext(Auth0Context);
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

    function changeEdit(){
        AuthContext.setEdit(true); 
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box pt={3} >
                    <Typography variant="h3">Overview</Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box className="small" m={2} p={6} borderRadius="borderRadius">
                    <Avatar alt="Remy Sharp" className={classes.large} src={AuthContext.data ? AuthContext.data.picture : ""}/>
                </Box>
                <Points/>
            </Grid>
            <Grid item xs={8} >
                <Box bgcolor="info.main" borderRadius="borderRadius" m={2} p={3}> 
                        <Button onClick={changeEdit}> <EditIcon/> </Button>
                        <Typography variant="h4">General</Typography>
                        <Typography variant="body1">Name - {AuthContext.data.name}</Typography>
                        <Typography variant="body1">Email - {AuthContext.data.email}</Typography>
                        <Typography> School - {AuthContext.data.user_metadata.education.school}</Typography>
                        <Typography> Department - {AuthContext.data.user_metadata.education.department}</Typography>
                        <Typography> Career Stage - {AuthContext.data.user_metadata.education.careerStage}</Typography>
                        <Typography>Expertise</Typography>
                        {AuthContext.data.user_metadata.expertise.map(e => <Chip label={e}></Chip>)}
                        <Typography>Interests</Typography>
                        {AuthContext.data.user_metadata.interest.map(e => <Chip label={e}></Chip>)}
                        <Typography>{AuthContext.data.user_metadata.research}</Typography>
                        <Typography>{AuthContext.data.user_metadata.social.sussex}</Typography>
                        <Typography>Available or ad-hoc paid project work? {AuthContext.data.user_metadata.education.available}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Dashboard
