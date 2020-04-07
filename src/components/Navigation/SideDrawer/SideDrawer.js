import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxi/Auxi';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css'

const sideDrawer = props => { 
    let assignedClasses = [classes.SideDrawer, classes.Open];
    if(!props.show){
        assignedClasses = [classes.Close,classes.SideDrawer];
    }
   
return ( 
    <Aux>
      {props.show ?
        ( <Aux><Backdrop clicked={props.removeMenu}/>
        <div className={assignedClasses.join(' ')} onClick={props.removeMenu}>
            <div className={classes.Logo}><Logo /></div>
          
          <div onClick={props.removeMenu}
          className={classes.Cross}>
              <div></div>
              <div></div>
          </div>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </div> </Aux>): null}  
       
    
    </Aux>);

}


export default sideDrawer;