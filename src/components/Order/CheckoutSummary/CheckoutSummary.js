import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'


const checkoutSummary = props => { 
return ( 
    <div className={classes.CheckoutSummary}> 
         <h1>Hope the Burger taste good!!! </h1>   
        <div style={{width:'100%'}}>
        <Burger ingredients={props.ingredients}/>
        <p>The cost of the burger is <strong>{props.price}</strong></p>
        </div>
        <Button btnType='Danger' clicked={props.cancelled}> Cancel</Button>
        <Button btnType='Success' clicked={props.continued}> Continue</Button>
        
    </div>);

}


export default checkoutSummary;