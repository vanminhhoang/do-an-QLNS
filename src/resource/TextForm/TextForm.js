import React from 'react'
import './css/TextForm.css'

import { Link } from 'react-router-dom'

function TextForm(props) {
    return (
        <div className="text-box" style={props.style}>
            <span>{props.text}</span>
            <Link to={props.link}>{props.text_link}</Link>
        </div>
    )
}

export default TextForm
