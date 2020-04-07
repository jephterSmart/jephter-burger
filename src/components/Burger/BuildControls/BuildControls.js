import React from 'react';

import BuildControl from './BuildControl/BuildControl'
import  classes  from './BuildControls.css';

const controls = [
    {Label:'Salad', type:'salad'},
    {Label:'Bacon', type:'bacon'},
    {Label:'Cheese', type:'cheese'},
    {Label:'Meat', type:'meat'},
]
const buildControls = props => { 
return ( 
    <div className={classes.BuildControls}>
    <p>Current Prices: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl=> <BuildControl 
    key ={ctrl.Label} 
    Label={ctrl.Label}
    added ={() => props.addIngredient(ctrl.type)}
    removed={() => props.removeIngredient(ctrl.type)}
    disabled = {props.disabled[ctrl.type]}/>)}
     <button 
     disabled={!props.purchasable}
     className={classes.OrderButton}
     onClick={props.clicked}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER NOW'}</button>

    </div>);

}


export default buildControls;