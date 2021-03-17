import { Box, Grid, Hidden, Typography } from '@material-ui/core';
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
    <>
        { AuthContext.data.app_metadata ?
        <Grid container>
        <Grid item xs={12}>
            <Statistics/>
        </Grid>
        <Grid item xs={12}>
            <ApproveEvents/>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box style={{ height : '19rem', width : '99%'}}>
                <PieChartInterest/>
            </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
            <Box style={{ height : '19rem', width : '99%'}}>
                <PieChartExpertise/>
            </Box>
        </Grid>
        <Hidden mdDown>
            <Grid item lg={12} xs={12}>
                <div style={{height : "400px", width : "100%"}}>
                    <StackedBarChart/>
                </div>
            </Grid>
        </Hidden>
        </Grid>
        :
        <Typography> You are authorised to view this page </Typography>
        }
    </>
    )
}

export default AdminPanel

