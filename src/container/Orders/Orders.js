import React, {Component} from 'react';
import {connect} from 'react-redux'

import axios from '../../axios-burger-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.css'
import * as actions from '../../store/actions/index'

class Orders extends Component {

componentDidMount(){
    this.props.onFetchOrders()

}  

render(){
    let transformOrder = null;
    if(this.props.orders){
        transformOrder= this.props.orders.map(order =>
            <Order key={order.id} ingredients = {order.ingredients} price={order.total}/>
    )	
    
    }
    if(this.props.loading)
    transformOrder = <Spinner /> 
    return (
        <div className={classes.Orders}> 
            {transformOrder}
        </div>);
    }
}

const mapStateToProps = (state) =>{
    return{
        loading : state.order.loading,
        orders: state.order.order
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => {dispatch(actions.fetchOrder())}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));