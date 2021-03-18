import { Box, Grid, Paper, Tab, Tabs, Typography, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import PastEvents from './components/events/PastEvents';
import UpcomingEvents from './components/events/UpcomingEvents';
import StarIcon from '@material-ui/icons/Star';

function Events() {
    
    const [value, setValue] = useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
    
    const GreyTypography = withStyles({
        root: {
          color: "grey"
        }
      })(Typography);
    
    return (
        <div>
            <Box my={2}>
                <Grid container justify="center">
                    <Grid item>
                        <Paper square>
                            <Tabs
                                indicatorColor="primary"
                                value={value}
                                textColor="primary"
                                onChange={handleChange}
                                >
                                <Tab label="Upcoming Events"/>
                                <Tab label="Past Events" />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Box mt={2} style={{  display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}>
                        <StarIcon style={{ fill : '#A9F0BA'}} fontSize="small"/> <GreyTypography variant="body2">Matches Interests</GreyTypography><Box mx={2}></Box>
                        <StarIcon style={{ fill : ' #7ED6F0'}} fontSize="small"/> <GreyTypography variant="body2">Matches Expertise</GreyTypography><Box mx={2}></Box>
                        <StarIcon style={{ fill : '#E86161'}}fontSize="small"/> <GreyTypography variant="body2">Matches Both</GreyTypography><Box mx={2}></Box>
                    </Box>
                </Grid>
            </Box>
            { value === 0 ? <UpcomingEvents/>: <PastEvents/> }
        </div>
    )
}

export default Events
