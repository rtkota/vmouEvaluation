import React from 'react'
import classes from './Modal.module.css'
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Backdrop from '../Backdrop/backdrop'
const modal = (props) => {
    return (
    <Auxilary>
    <Backdrop clicked={props.modalClosed} show={props.show}/>
    <div 
        className={classes.Modal}
        style={{transform:props.show ? 'translateY(0)' : 'translateY(-100)',
        opacity:props.show ? '1' : '0'}}>
            {props.children}
    </div>
    </Auxilary>
    );
}

export default modal;