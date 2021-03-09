import { Box, Grid } from '@material-ui/core';
import React from 'react'
import ApproveEvents from './components/events/ApproveEvents';
import StackedBarChart from './charts/StackedBarChart';
import Statistics from './components/Statistics';
import PieChartInterest from './charts/PieChartInterest';
import PieChartExpertise from './PieChartExpertise';


function AdminPanel() {

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Statistics/>
                </Grid>
                <Grid item xs={12}>
                    <ApproveEvents/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item lg={6} xs={12}>
                            <Box style={{ width : "100%", height : '400px'}}>
                                <PieChartExpertise/>
                            </Box>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Box style={{ width : "100%", height : '400px'}}>
                                <PieChartInterest/>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Box my={7}>
                    <div style={{height : "400px", width : "100%"}}>
                        <StackedBarChart/>
                    </div>
                </Box>
            </Grid>
        </div>
    )
}

export default AdminPanel
