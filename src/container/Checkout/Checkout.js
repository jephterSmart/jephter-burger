import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


import ContactData from './ContactData/ContactData';


class Checkout extends Component {


continuedHandler = () =>{
    this.props.history.push(this.props.match.url + '/contact-data')
   
}
cancelledHandler = () =>{
    this.props.history.goBack();
}

render(){
   let summary = <Redirect to='/' />
   if(this.props.ings) {
       const purchaseDone = this.props.purchased ? <Redirect to='/' /> : null;
       summary = (
        <div>
                {purchaseDone}
                <CheckoutSummary 
                ingredients={this.props.ings} 
                price={this.props.price}
                continued = {this.continuedHandler}
                cancelled={this.cancelledHandler}
                />
               <Route path={this.props.match.url + '/contact-data'}
               component = {ContactData}
                />
            </div>
       )
   }
    return summary;
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burger.ingredients,
        price: state.burger.totalPrice.toFixed(2),
        purchased: state.order.purchased
    }
} 
export default connect(mapStateToProps)(Checkout);