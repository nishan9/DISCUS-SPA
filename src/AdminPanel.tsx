import { Box } from '@material-ui/core';
import React from 'react'
import ApproveEvents from './components/ApproveEvents';
import PieChart from './components/Charts/PieChart';
import StackedBarChart from './components/Charts/StackedBarChart';
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
                <ApproveEvents/>
            </Box>
        </div>
    )
}

export default AdminPanel
