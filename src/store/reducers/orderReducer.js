import * as actionTypes from '../actions/actionTypes';

const initialState ={
    order:[],
    loading: false,
    purchased: false
}
const reducer = (state=initialState, action) =>{
    const updatedState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            updatedState.purchased = false;
            return updatedState;
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            updatedState.order = updatedState.order.concat(newOrder);
            updatedState.loading = false;
            updatedState.purchased = true;
            return updatedState;
        case actionTypes.BURGER_PURCHASE_FAIL:
            updatedState.loading = false;
            return updatedState;
        case actionTypes.BURGER_PUCHASE_START:
            updatedState.loading = true;
            return updatedState;
        // for the order page
        case actionTypes.FETCH_ORDER_START:
            updatedState.loading = true;
            return updatedState;
        case actionTypes.FETCH_ORDER_SUCCESS:
            updatedState.order = action.orderData;
            updatedState.loading = false
            return updatedState;
        case actionTypes.FETCH_ORDER_FAIL:
            updatedState.loading = false;
            return updatedState;
        default: return updatedState;
    }
}
export default reducer;