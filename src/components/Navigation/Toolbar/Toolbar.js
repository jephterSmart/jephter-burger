import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Togglebar from '../Togglebar/Togglebar';

const toolbar = props => { 
return ( 
    <header className={classes.Toolbar}>
    <Togglebar clicked={props.clicked}/>
    <div className={classes.Logo}>
   <Logo /></div>
    <nav className={classes.MobileOnly}>
        <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
    </header>);

}


export default toolbar;