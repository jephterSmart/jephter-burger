import React from 'react';

import classes from './Togglebar.css';

const togglebar = props => { 
return ( 
   <button 
   onClick={props.clicked}
   className={classes.Togglebar}>
       <span></span>
       <span></span>
       <span></span>
   </button>);

}


export default togglebar;