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
            Search Engine for users. 
        </div>
    )
}

export default SearchUsers

