import React, { useState } from 'react'
import Navbar from './Navbar'

function ViewUser(props : any) {
    const [loginPressed, setLoginPressed] = useState(false);

    console.log(props.match.params.user_id)

    return (
        <div>
            <Navbar changeLoginState={(val: boolean) => setLoginPressed(val)} /> 
        </div>
    )
}

export default ViewUser
