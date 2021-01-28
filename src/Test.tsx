import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core'
import React, { useState } from 'react'

function Test() {
    const [theArray, setTheArray] = useState<string[]>([]);


    function handleChange (checkbocName: string, state: boolean) {
        if (state === true){
            setTheArray(theArray => [...theArray, checkbocName])
        } else {
            const result = theArray.filter(dep => dep !== `${checkbocName}`);
            setTheArray(result); 
        }
        console.log(theArray)
    }
    return (
        <div>
        <FormControl component="fieldset">
            <FormLabel component="legend">Department</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox 
                            onChange={(e) => handleChange("enginfo", e.target.checked)} 
                        />}
                    label="Engineering and Informatics"
                />

                <FormControlLabel
                control={<Checkbox onChange={(e) => handleChange("sci", e.target.checked)} />}
                label="Life Sciences"
                />
                <FormControlLabel
                control={<Checkbox onChange={(e) => handleChange("psych", e.target.checked)} />}
                label="Psychology"
                />
            </FormGroup>
        </FormControl> 
        </div>
    )
}

export default Test
