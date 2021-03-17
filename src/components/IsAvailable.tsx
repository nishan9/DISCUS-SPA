import { Box } from '@material-ui/core'
import React from 'react'

function isAvailable() {
    return (
        <Box px={2} py={1} borderRadius={10} bgcolor="primary.main">
            Available for Ad-Hoc
        </Box>
    )
}

export default isAvailable
