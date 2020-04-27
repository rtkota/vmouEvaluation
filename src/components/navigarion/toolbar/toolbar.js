import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../logo/logo'
import NavItems from '../navItems/navItems'
import DrawerToggle from '../SideDrawer/drawerToggle/drawerToggle'

const toolbar = (props) => (
<header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleclicked}/>
    <div className={classes.Logo}>
        <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
        <NavItems isAuth={props.isAuthenticate} />
    </nav>
</header>
)

export default toolbar;