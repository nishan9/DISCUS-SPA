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
            <th>Name</th>
            <th>Email Address</th> 
            <th>Department</th>
            </tr>
            {data.map((item:{name:string, emailAddress:string, Department: String}) => (
            <tr>
            <td>{ item.name}</td>
            <td>{ item.emailAddress}</td>
            <td>{ item.Department}</td>
            </tr>
            ))
            }
            </table>
        </div>
    )
}

export default SearchUsers

