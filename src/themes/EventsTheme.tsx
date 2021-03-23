import { makeStyles } from '@material-ui/core';
import React from 'react'
import events from '../assets/eventsBackground.svg'; 

const EventsTheme = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        overflowY: 'unset',
    },

    customizedButton: {
        padding: "10px",
        position: "absolute",
        right: -26,
        top: -27,
    }, 
    box : {
        position : "relative", 
        backgroundColor : 'white', 
        border : '1px solid rgba(0,0,0,0.1)', 
    }, 
    eventContainer : {
        backgroundColor : "lightblue", 
    },
    centerSVG : {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        },
    leftButtons : {
        textAlign :'center',
        padding : '4px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft : 0,
            paddingRight : 0,
            PaddingTop : 0,
            paddingBottom : '2px', 
        },
    },

}));

export default EventsTheme
