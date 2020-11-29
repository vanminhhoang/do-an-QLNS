import React from 'react';

import './SelectIcon.css';

function SelectIcon({icon,description,style}){
    return(
        <div className="selecticon" style={style}>
            <select className="selecticonselect">
                <option value={null}>[{description}]</option>
            </select>
            <img src={icon} className="selecticonimg"/>
        </div>
    )
}

export default SelectIcon;