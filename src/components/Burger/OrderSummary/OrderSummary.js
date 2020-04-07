import React from 'react';

import Aux from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button'


const orderSummary = props => {
    const ingredients = Object.keys(props.ingredients)
        .map(igkey=> <li key={igkey}style={{textTransform: 'capitalize'}}>{igkey}: <span>{props.ingredients[igkey]}</span></li>)

return ( 
    <Aux>
        <p>This is your delicious burger! It contains the following:</p>
        <ul>
            {ingredients}
        </ul>
        <p><strong>Total Price: {props.price}</strong></p>
        <p>Continue to checkout!</p>
        <Button btnType='Danger' clicked={props.cancelPurchase}>Cancel</Button>
        <Button btnType='Success' clicked={props.continuePurchase}>Continue</Button>
        </Aux>
    );

}


export default orderSummary;
