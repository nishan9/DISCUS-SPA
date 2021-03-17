import { Box, Grid, Hidden } from '@material-ui/core';
import React from 'react'
import ApproveEvents from './components/events/ApproveEvents';
import StackedBarChart from './charts/StackedBarChart';
import Statistics from './components/Statistics';
import PieChartInterest from './charts/PieChartInterest';
import PieChartExpertise from './PieChartExpertise';


function AdminPanel() {

    return (
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
    )
}

export default AdminPanel