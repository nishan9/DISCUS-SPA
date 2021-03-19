import { Box, Card, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import ApproveEvents from './components/events/ApproveEvents';
import StackedBarChart from './charts/StackedBarChart';
import Statistics from './components/Statistics';
import PieChartInterest from './charts/PieChartInterest';
import PieChartExpertise from './PieChartExpertise';
import { Auth0Context } from './context/Auth0Context';


function AdminPanel() {
    const AuthContext = useContext(Auth0Context)
    return (
    <div style={{padding : '10px', paddingTop : '30px'}}>
        { AuthContext.data.app_metadata ?
        <Grid container justify="center" spacing={3}>
        <Grid item lg={6} xs={12}>
            <Statistics/>
        </Grid>
        <Grid item sm={11} md={9}>
            <ApproveEvents/>
        </Grid>
        <Divider/>
        <Grid item xs={12} lg={6}>
            <Card style={{paddingTop : '10px'}}>
                <Box style={{ height : '19rem', width : '99%'}} textAlign="center">
                    <Typography> Top 10 Interest tags</Typography>
                    <PieChartInterest/>
                </Box>
            </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Card style={{paddingTop : '10px'}}>
                <Box style={{ height : '19rem', width : '99%'}} textAlign="center">
                    <Typography>Top 10 Expertise tags</Typography>
                    <PieChartExpertise/>
                </Box>
            </Card>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={12} xs={12}>
                <Box style={{height : "400px", width : "100%"}} textAlign="center">
                    <Typography variant="h4"> User by School and Departments </Typography>
                    <StackedBarChart/>
                </Box>
            </Grid>
        </Hidden>
        </Grid>
        :
        <Typography> You are authorised to view this page </Typography>
        }
    </div>
    )
}

export default AdminPanel

