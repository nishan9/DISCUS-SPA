import { Player } from '@lottiefiles/react-lottie-player'
import { Box } from '@material-ui/core'
import React from 'react'
import lottie from '../config/lottie.json'

function Loading() {

    return (
        <Box p={20}>
            <Player
                autoplay
                loop
                src={lottie}
                style={{ height: "300px", width: "300px" }}
                >
            </Player>
        </Box>
    )
}

export default Loading
