import React from 'react';
import classes from './input.module.css'

const input = (props) => {
    let inputElement = null;
    let validError = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    if (props.invalid &&  props.touched) {
        validError=<p className={classes.ErrorMessage}>{props.validationErrorMessage}</p>;
    }
  
    switch (props.elementtype) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
             {...props.elementconfig} value={props.elementvalue} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}{...props.elementconfig} value={props.elementvalue} onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = <select 
                                className={inputClasses.join(' ')} 
                                value={props.elementvalue} onChange={props.changed}>
                                {props.elementconfig.options.map(option => (
                                    <option key={option.value}
                                        value={option.value}>
                                        {option.displayvalue}
                                    </option>
                                ))}
                            </select>
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementconfig} value={props.elementvalue} onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validError}
        </div>
    );
}

export default input;