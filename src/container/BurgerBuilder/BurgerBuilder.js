import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxi/Aux'
import axios from '../../axios-burger-instance'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchased:false,
    }
    componentDidMount(){
        this.props.onInitIngredients()
    }
   
  purchasedHandler = ()=>{
      if(this.props.isAuthenticated){
        this.setState({purchased:true});
      }
      else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth')
      }
      
    }
  removedPurchasedHandler = () => {this.setState({purchased:false})}
  continuePurchaseHandler = () => {
      this.props.onPurchaseInit()
     this.props.history.push('/checkout')
    
}
  purchaseAllowedHandler = () =>{
      const sum = Object.values(this.props.ings)
      .reduce((acc,el)=>acc + el,0);
       return sum > 0 ;
  }
  
render(){	
    /*this tells us whether the less button should be disabled or not */
    let disabledInfo = {...this.props.ings}
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <=0;
            }
        let orderSummary = null;
        let burger = <Spinner />
        if(this.props.ings){
            burger =(
                <Aux>
                    <Burger ingredients={this.props.ings}/>  
                    <BuildControls 
                    isAuth = {this.props.isAuthenticated}
                    addIngredient = {this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    price = {this.props.price}
                    disabled={disabledInfo}
                    purchasable ={this.purchaseAllowedHandler()}
                    clicked={this.purchasedHandler}/>
                </Aux>
            )
         orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        cancelPurchase={this.removedPurchasedHandler}
        continuePurchase={this.continuePurchaseHandler}
        price={this.props.price.toFixed(2)}/>
        }
        
    return (
        <Aux>
        <Modal 
        show={this.state.purchased}
        removeBackdrop={this.removedPurchasedHandler}>
            {orderSummary}
        </Modal>
        {this.props.error ? <p>Can't load ingredients</p> : burger }
        </Aux>);
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token != null
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)), 
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)), 
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onPurchaseInit : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)) ;