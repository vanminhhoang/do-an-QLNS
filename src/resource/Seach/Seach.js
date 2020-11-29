import React from 'react';
import './Seach.css'


function Seach({icon,text,style,decriptson}){
    return(
        <div className="seach" style={style}>
            <input className="seachtext"/>
            <img src={icon} className="seachicon"/>
        </div>
    )
}

export default Seach;