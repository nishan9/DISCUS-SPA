import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import Auth0user from './models/Auth0user';

function WelcomeScreen() {
    const Auth0 = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const [data, setData] = useState<Auth0user>()
    useEffect(() => {
        Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
    },[Auth0])

    useEffect(() => {
        fetchData();
    }, [accessToken])

    async function fetchData(){
        const response = await fetch('http://localhost:5000/api/users/me', { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json',
            }
           });
          setData(await response.json());
    }

    return (
        <div>
            <p>Email: {data?.email}</p>
            <p>Department: {data?.user_metadata.department}</p>
            <p>LinkedIn: {data?.user_metadata.linkedin}</p>
            <p>Sussex: {data?.user_metadata.sussex}</p>
        </div>
    )
}

export default WelcomeScreen
