import { Box } from '@material-ui/core';
import React from 'react'

function viewEvents(props : any) {
    const event_id = props.match.params.event_id; 

    return (
        <div>
           <Box m={10}>
               gyguiguig
               </Box> <p>gygyhhhhhhhhhhhhhhhhhhhhhhhhhhhhg</p><p>{event_id}</p>
        </div>
    )
}

export default viewEvents
