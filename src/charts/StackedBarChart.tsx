import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import UserTheme from '../themes/UserTheme';
  
function StackedBarChart() {
    const [Bardata, setBarData]= useState([]); 
    
    useEffect(() => {
      GetData(); 
    }, []);

    async function GetData(){
      const getData = await fetch(`${process.env.REACT_APP_API_URL}/UserSearch/Chart`, { 
        headers: {
        'Content-Type': 'application/json',
        }
      });
      setBarData(await getData.json());  
    }
    

  
    //@ts-ignore
    const CustomTooltip = ({ active , payload , label}) => {
    //@ts-ignore
            const getIntroOfPage = (label, index) => {    
                let x = ""; 
                Bardata.map( (item : any) => {
                    if (item.name == label){
                        x = item.caption[index]
                    }
                })
                return x; 
            };
            if (active && payload && payload.length) {
                return (
                  <div className="custom-tooltip" style={{ backgroundColor : '#e3e3e3', padding : '6px', borderRadius : 2, textAlign : 'left'}}>
                        { payload.map ( (e : any, i : number) => {
                          return <Typography variant="body2" className="intro">{getIntroOfPage(label,i)} - {`${e.value}`} </Typography>
                        })}
                  </div>
            );
        }
        return null; 
    }




    return (
        <>
          {Bardata ? 
              <div style={{height : "100%", width : "100%"}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={400}
                    data={Bardata}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={
                    //@ts-ignore
                    <CustomTooltip />} />
                      <Bar dataKey="bar1" stackId="a" fill="#8884d8" />
                      <Bar dataKey="bar2" stackId="a" fill="#CA83B0" />
                      <Bar dataKey="bar3" stackId="a" fill="#84ca9d" />
                      <Bar dataKey="bar4" stackId="a" fill="#9AC3E4" />
                      <Bar dataKey="bar5" stackId="a" fill="#F6F7B9" />
                      <Bar dataKey="bar6" stackId="a" fill="#A1B1DB" />
                      <Bar dataKey="bar7" stackId="a" fill="#F8B1A4" />
                      <Bar dataKey="bar8" stackId="a" fill="#E2F0C5" />
                      <Bar dataKey="bar9" stackId="a" fill="#FCEAA5" />
                      <Bar dataKey="bar10" stackId="a" fill="#A3DEFA" />
                      <Bar dataKey="bar11" stackId="a" fill="#D4EDE0" />
                      <Bar dataKey="bar12" stackId="a" fill="#FAD0C9" />
                      <Bar dataKey="bar13" stackId="a" fill="#F39FC1" />
                      <Bar dataKey="bar14" stackId="a" fill="#C6D3EC" />

                  </BarChart>
                </ResponsiveContainer>
              </div>
                :
                "no data yet"  
        }

        </>
    )
}

export default StackedBarChart
