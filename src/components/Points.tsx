import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { Auth0Context } from '../context/Auth0Context';

function Points() {
    const AuthContext = useContext(Auth0Context);


    return (
        <div>
            <Box m={1} p={3} bgcolor="primary.main" borderRadius="borderRadius">
                <Typography>{AuthContext.data.user_metadata.events.length} Experience</Typography>
            </Box>
        </div>
    )
}

export default Points
