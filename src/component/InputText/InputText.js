import React from 'react'
import './css/InputText.css'

function InputText(props) {
    return (
        <div className="input">
            <input
                type={props.type}
                className="input-content"
                placeholder={props.placeholder}
                onChange={(e) => {
                    props.setInputContent(e.target.value)
                }}
            />
            <span className="focus"></span>
        </div>
    )
}

export default InputText
