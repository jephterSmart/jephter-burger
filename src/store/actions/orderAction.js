import * as actionTypes from './actionTypes';
import axios from '../../axios-burger-instance';


const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}

const burgerPurchaseFail = () =>{
    return{
        type: actionTypes.BURGER_PURCHASE_FAIL
    }
}
const burgerPurchaseStart = () =>{
    return{
        type: actionTypes.BURGER_PUCHASE_START
    }
}

export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

// async code for ordering
export const burgerPurchase = (orderData) =>{
    return (dispatch,getState) =>{
        dispatch(burgerPurchaseStart())
        axios.post('/orders.json?auth='+ getState().auth.token,orderData)
      .then(resp=>{
        dispatch(burgerPurchaseSuccess(resp.data.name, orderData))
      })
      .catch(err=>{
        dispatch(burgerPurchaseFail())
      })
    }
}

//This belongs to the order page

const fetchOrderStart = () =>{
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}
const fetchOrderSuccess = (order) =>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orderData: order
    }
}
const fetchOrderFail = () =>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL
    }
}

export const fetchOrder = () =>{
    return (dispatch,getState) => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth='+getState().auth.token +
             '&orderBy="userId"&equalTo="' + getState().auth.userId + '"';
        axios.get('/orders.json'+queryParams)
        .then(response =>{
    let fetchedOrder = []
    for(let key in response.data){
        fetchedOrder.push({
            id:key,
            ...response.data[key]
        })
    }
    dispatch(fetchOrderSuccess(fetchedOrder))
})
    .catch(err => {
        dispatch(fetchOrderFail())
})
    }
}
