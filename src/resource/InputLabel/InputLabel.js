import React, { useState } from 'react';

import './InputLabel.css';


function InputLabel({text,ifcheck,style,type}){
    const [check,setCheck] = useState(true);
    return(
        <div className="inputlabel" style={style}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <a id="inputlabeltext">{text}</a>
                <a id="inputlabelcheck">(*)</a>
            </div>
            <input className="inputlabelinput" type={type?type:'text'} onChange={e=>{
                if(ifcheck){
                    if(ifcheck(e.target.value)){
                        setCheck(true);
                    } else {
                        setCheck(false);
                    }
                }
            }}/>
        </div>
    );
}

export default InputLabel;