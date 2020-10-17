import React from 'react';

import style from './InputField.module.css';

const InputField = (props) => {
    
    let checkmark;
    if (props.type === "radio") {
        checkmark = <span className={style.checkmark}></span>
    }
    const width = props.width ? props.width : 12;
    const disabled = props.disabled;
    return ( 
        <div key={props.key}
            className={[style.formField, "col-"+width, style[props.clName]].join(" ")}  >
            <label>
                {props.text}
                <input  type={props.type} id={props.id} 
                        value={props.value}
                        onChange={props.onChange}
                        name={props.name} disabled={disabled}
                />
                {checkmark}
            </label>
        </div>
    )
}
 
export default InputField;