import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

function Welcome() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    async function fetchData(){
        const response = await fetch('http://localhost:5000/api/users/id');
        const data = await response.json();
        setData(data);
        console.log(data)
    }

    return (
        <div>
            <table>
            <tr>
            </tr>
            {data.map((item:{email:string, nickname : string, picture : string, created_at : string}) => (
            <tr>
            <Avatar alt="Travis Howard" src={ item.picture} />
            <td>{ item.email}</td>
            <td>{ item.nickname}</td>


            </tr>
            ))
            }
            </table>
        </div>
    )
}

export default Welcome
