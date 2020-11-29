import React from 'react';
import './Header.css'


function Header({icon,text,style}){
    return(
        <div className="header" style={style}>
            <img src={icon} className="headericon"/>
            <a id="headertext">{text}</a>
        </div>
    )
}

export default Header;