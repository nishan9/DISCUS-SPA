import { Box, Typography } from '@material-ui/core';
import React from 'react'
import ApproveEvents from './components/events/ApproveEvents';
import PieChart from './components/charts/PieChart';
import StackedBarChart from './components/charts/StackedBarChart';
import Statistics from './components/Statistics';


function AdminPanel() {

    return (
        <div>
            <Box>
                <Statistics/>    
                <div style={{height : "400px", width : "100%"}}>
                    <StackedBarChart/>
                </div>
                <div style={{height : "300px", width : "600px"}}>
                    <PieChart/>
                </div>
                <Typography variant={"h3"}> Approve Events </Typography>
                <ApproveEvents/>
            </Box>
        </div>
    )
}

export default AdminPanel
