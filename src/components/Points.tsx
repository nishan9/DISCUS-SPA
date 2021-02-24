import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { Auth0Context } from '../context/Auth0Context';

function Points() {
    const AuthContext = useContext(Auth0Context);


    return (
        <div>
            <Box m={1} p={2} bgcolor="info.main" borderRadius="borderRadius">
                <Typography variant="h3">Points</Typography>
                <Typography variant="h4">{AuthContext.data.user_metadata.events.length} Points</Typography>
            </Box>
        </div>
    )
}

export default Points
