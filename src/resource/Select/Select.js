import React from 'react';
import './Select.css'


function Select({icon,text,style,decriptson,listoption}){
    return(
        <select className="select" style={style}>
            <option value={null}>{decriptson}</option>
        </select>
    )
}

export default Select;