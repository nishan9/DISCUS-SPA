import { Player } from '@lottiefiles/react-lottie-player'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import NotFound from '../config/NotFound.json'

function NotFoundPlayer() {

    return (
        <Box p={15} textAlign="center">
            <Typography gutterBottom variant="h4"> No events found...</Typography>
            <Player
                autoplay
                loop
                src={NotFound}
                style={{ height: "50vh", width: "auto" }}
                >
            </Player>
        </Box>
    )
}

export default NotFoundPlayer
