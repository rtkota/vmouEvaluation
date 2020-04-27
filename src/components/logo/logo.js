import React from 'react';
import burgerLogo from '../../assets/logo.png'
import classes from './logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MuBurger"></img>
    </div>
)

export default logo;