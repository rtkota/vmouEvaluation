import React from 'react';
import Logo from '../../logo/logo';
import NavItems from '../navItems/navItems'
import classes from './Sidedrawer.module.css'
import Backdrop from '../../UI/Backdrop/backdrop'
import Auxilary from '../../../hoc/Auxilary/Auxilary'

const sidedrawer = (props) => {
    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if (props.open)
        attachedClasses =[classes.Sidedrawer, classes.Open];
    return (
        <Auxilary>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
               <Logo /> 
            </div>
            <nav>
                <NavItems isAuth={props.isAuthenticate}/>
            </nav>
        </div>
        </Auxilary>
    );

}

export default sidedrawer;