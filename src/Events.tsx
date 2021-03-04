import { Box, Grid, Paper, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import PastEvents from './components/events/PastEvents';
import UpcomingEvents from './components/events/UpcomingEvents';

function Events() {
    
    const [value, setValue] = useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
    
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
            </Box>
            { value === 0 ? <UpcomingEvents/>: <PastEvents/> }
        </div>
    )
}

export default Events
