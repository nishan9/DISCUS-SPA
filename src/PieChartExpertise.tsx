import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { useAuth0 } from '@auth0/auth0-react';

function PieChartExpertise() {
    const Auth0 = useAuth0();    
    const [PieData, setPieData]= useState([]); 
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        if(Auth0.isAuthenticated){
            Auth0.getAccessTokenSilently().then((accessToken => setAccessToken(accessToken)));
        }
        getData();
    }, [Auth0, accessToken])
        
    async function getData(){
        const getData = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/PieChart/Expertise`, { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json',
            }
        });
        setPieData(await getData.json());  
    }


    return (
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
    )
}

export default PieChartExpertise
