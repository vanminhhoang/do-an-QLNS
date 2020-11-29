import React from 'react';
import './Button.css'


function Button({icon,text,style}){
    return(
        <div className="button" style={style}>
            <img src={icon} className="buttonicon"/>
            <a id="buttontext">{text}</a>
        </div>
    )
}

export default Button;