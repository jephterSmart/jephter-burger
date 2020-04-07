import React from 'react';

import classes from './Order.css';

const Order = props => { 
    const ingredients = Object.keys(props.ingredients)
    .map(igkey => <span key={igkey}>{igkey} ({props.ingredients[igkey]})</span>)
    
return ( 
    <div className={classes.Order}>
    <p>Ingredients :{ ingredients}</p>
    <p>Price :<strong>USD{Number(props.price).toFixed(2)}</strong></p>
    </div>);

}


export default Order;