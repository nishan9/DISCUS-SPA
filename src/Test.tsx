import React from 'react'
import { Player, Controls } from "@lottiefiles/react-lottie-player";

function Test() {
    return (
        <div>
      <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
      <p>fdfd</p>
        </div>
    )
}

export default Test
