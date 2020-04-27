import React from 'react';
import classes from './navItems.module.css'
import NavItem from './navItem/navItem' 

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact active>Home</NavItem>
        {props.isAuth ? <NavItem link="/marksentry">Marks Entry</NavItem>:null}
        {props.isAuth ? <NavItem link="/orders">Bills</NavItem>:null}
        {props.isAuth ?<NavItem link="/logout">Logout</NavItem>:<NavItem link="/auth">Sign In</NavItem>}
    </ul>
)

export default navItems;