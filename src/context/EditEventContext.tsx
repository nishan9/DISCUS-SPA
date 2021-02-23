import React, {createContext, useState} from 'react';
import EventEntity from "../models/EventEntity";

const eventdeafultvalue : EventEntity = {
    "id": 0,
    "title": "",
    "dateTime": "",
    "finishedDateTime" : "", 
    "type": "",
    "url": "",
    "description": "",
    "isDISCUS": true,
    "isApproved" : false,
    "tags" : ""
}

export const EditEventContext = createContext({
    event : eventdeafultvalue,
    setEvent : (event : EventEntity) => {}, 
});

export const EditEventContextProvider : React.FC = ({children}) => {
    const [event, setEvent] = useState<EventEntity>(eventdeafultvalue)

    return(
        <EditEventContext.Provider value={{event, setEvent}}>
            {children}
        </EditEventContext.Provider>
    )
}