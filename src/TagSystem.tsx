import { Box, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useState } from 'react'

function TagSystem() {
    const [tags, setTags] = useState<String[]>([]); 

    function addtoState(value : { Subject : string}[]){
        setTags(value.map ( x => x.Subject)); 
    }

    return (
        <Box m={5}>
        <Autocomplete
          multiple
          onChange={(event, value, reason) => addtoState(value)}
          id="multiple-limit-tags"
          options={Subjects}
          getOptionLabel={(option) => option.Subject}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Tags" />
          )}
        />
      </Box>
    )
}
const Subjects = [
    { Subject: 'Biology'},
    { Subject: 'Physics'},
    { Subject: 'Mathematics'},
    { Subject: 'Julie'},
  ];

export default TagSystem
