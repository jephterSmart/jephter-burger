import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => { 
return ( 
    <ul className={classes.NavigationItems}>
    <NavigationItem exact link='/'>Burger Builder</NavigationItem>
    {props.isAuthenticated?<NavigationItem link='/order'>Order</NavigationItem>: null}
   {props.isAuthenticated ?<NavigationItem link='/logout'>Logout</NavigationItem>
   : <NavigationItem link='/auth'>Authentication</NavigationItem>}
    </ul>);

}


export default navigationItems;