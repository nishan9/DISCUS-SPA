import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Typography } from '@material-ui/core';

function PieChartExpertise() {

    const [PieData, setPieData]= useState([]); 

    useEffect(() => {
        getData();
    }, [])
        
    async function getData(){
        const getData = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/PieChart/Expertise`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        setPieData(await getData.json());  
    }


    return (
        <div style={{height : "100%", width : "100%"}}>
            <Typography variant="h3"> Expertise </Typography>
            <ResponsivePie
                data={PieData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
            />
        </div>
    )
}

export default PieChartExpertise