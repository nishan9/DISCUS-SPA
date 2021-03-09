import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Box, Typography } from '@material-ui/core';

function PieChartInterest() {

    const [PieData, setPieData]= useState([]); 

    useEffect(() => {
        getData();
    }, [])
        
    async function getData(){
        const getData = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/PieChart/Interest`, { 
            headers: {
            'Content-Type': 'application/json',
            }
        });
        setPieData(await getData.json());  
    }


    return (
        <ResponsivePie
            data={PieData}
            margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
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
    )
}

export default PieChartInterest
