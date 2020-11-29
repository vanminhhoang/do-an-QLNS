import React from 'react';

import './SelectLabel.css'

function SelectLabel({text,style,description}){
    return(
        <div className="selectlabel" style={style}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <a id="selectlabeltext">{text}</a>
            </div>
            <select className="selectlabelselect">
                <option value={null}>[{description}]</option>
            </select>
        </div>
    )
}


export default SelectLabel;