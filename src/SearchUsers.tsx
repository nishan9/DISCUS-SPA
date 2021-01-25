import React, { useEffect, useState } from 'react'

function SearchUsers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    async function fetchData(){
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setData(data);
    }
    return (
        <div>
            <table>
            <tr>
            <th>Email</th>
            <th>Name</th>
            </tr>
            {data.map((item:{email:string, nickname : string}) => (
            <tr>
            <td>{ item.email}</td>
            <td>{ item.nickname}</td>
            </tr>
            ))
            }
            </table>
        </div>
    )
}

export default SearchUsers

