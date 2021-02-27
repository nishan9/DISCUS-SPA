import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import lottie from '../config/lottie.json'

function Loading() {

    return (
        <div>
       <Player
        autoplay
        loop
        src={lottie}
        style={{ height: "300px", width: "300px" }}
        ></Player>
        </div>
    )
}

export default Loading
