import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react'
import ApproveEvents from './components/events/ApproveEvents';
import StackedBarChart from './components/charts/StackedBarChart';
import Statistics from './components/Statistics';
import PieChartExpertise from './components/charts/PieChartExpertise';
import PieChartInterest from './components/charts/PieChartInterest';


function AdminPanel() {

    return (
        <div>
            <Box>
                <Statistics/>   
                <Box my={7}>
                    <Typography variant={"h3"}> Approve Events </Typography>
                    <ApproveEvents/>
                </Box> 
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Box p={3} style={{ width : "100%", height : '400px'}}>
                            <PieChartExpertise/>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box  p={3} style={{ width : "100%", height : '400px'}}>
                            <PieChartInterest/>
                        </Box>
                    </Grid>
                </Grid>
                <Box my={7}>
                    <div style={{height : "400px", width : "100%"}}>
                        <StackedBarChart/>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default AdminPanel
