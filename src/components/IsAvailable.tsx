import { Box } from '@material-ui/core'
import React from 'react'

function isAvailable() {
    //Renders a isAvailable component, extracted to be used in any component as necessary
    return (
        <Box px={2} py={1} borderRadius={10} bgcolor="primary.main">
            Available for Ad-Hoc
        </Box>
    )
}

export default isAvailable
