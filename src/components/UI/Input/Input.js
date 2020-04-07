import React from 'react';

import classes from './Input.css'

const input = props => { 
    let formElement = null;
    let assignedClasses = [classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched){
        assignedClasses.push(classes.Invalid)
    }
    switch(props.elementType){
        case('input'):
            formElement = <input onChange={props.changed}className={assignedClasses.join(' ')} {...props.elementConfig} value={props.value}/>
            break;
        case('textarea'):
            formElement = <textarea  onChange={props.changed}className={assignedClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case('select'):
            formElement =(
                <select onChange={props.changed}value={props.value}
                className={assignedClasses.join(' ')}>
                    {props.elementConfig.options.map(
                        option =><option value={option.value}>{option.displayValue}</option>)}
                </select>
            );
            break;
        default: formElement = <input onChange={props.changed} className={classes.InputElement} /> 
    }
    
return ( 
    <div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {formElement}
    </div>);

}


export default input;