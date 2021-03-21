import React from 'react'
import theme from '../theme';
import { Accordion, makeStyles, withStyles,} from '@material-ui/core';

const SearchTheme = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        margin : '15px'
    },
    box: {
      textAlign: 'center', 
      padding : 4,
      borderRadius : 4,
      background : "white", 
    }, 
    search : {
        display: 'inline-flex',
        VerticalAlign: 'text-bottom',
        BoxSizing: 'inherit',
        textAlign: 'center',
        AlignItems: 'center', 
    },
    color : {
        padding : '15px',
        backgroundColor : '#EBEBEB',
    }, 
    large: {
        width: 90, 
        height: 90, 
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      accordian : {
        backgroundColor : "#24CAC3", 
        borderRadius : 10
      },
      MuiAccordionroot: {
        "&.MuiAccordion-root:before": {
          backgroundColor: "#FAFAFA"
    }},
});

export default SearchTheme