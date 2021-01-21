import React, {useState, useEffect} from 'react'

function SearchEvent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    async function fetchData(){
        const response = await fetch('http://localhost:5000/api/discusEvents');
        const data = await response.json();
        setData(data);
    }
    return (
        <div>
            <table>
            <tr>
            <th>Title</th>
            <th>Date</th> 
            <th>Type</th>
            </tr>
            {data.map((item:{title:string, eventType:string, date: String}) => (
            <tr>
            <td>{ item.title}</td>
            <td>{ item.date}</td>
            <td>{ item.eventType}</td>
            </tr>
            ))
            }
            </table>
        </div>
    )
}

export default SearchEvent
