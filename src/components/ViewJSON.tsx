import React from 'react'
import Tags from '../config/Tags.json'
import ReactJson from "react-json-view"

function ViewJSON() {
    return (
        <div>
            <ReactJson
                src={Tags}
            />
        </div>
    )
}

export default ViewJSON
