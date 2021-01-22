import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core'
import React from 'react'

export default function Login() {
    const {loginWithRedirect } = useAuth0();
    return (
        <div>
            Discus
            <Button variant="contained" color="secondary"  onClick={() => loginWithRedirect()}>Login</Button> 
        </div>
    )
}
