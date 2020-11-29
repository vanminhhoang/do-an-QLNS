import React from 'react'
import './css/TitleForm.css'

function TitleForm(props) {
    return(
        <span className='title'>
            {props.title}
        </span>
    );
}

export default TitleForm;