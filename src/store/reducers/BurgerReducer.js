import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICE = {
    salad: 0.6,
    meat: 1.3,
    bacon: 0.7,
    cheese:0.3
}
const initialState ={
    ingredients:null,
    totalPrice : 4,
    error: false,
    building: false
}
const reducer = (state = initialState,action) =>{
    let updatedState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            updatedState.ingredients[action.ingredientName] += 1 ;
            updatedState.totalPrice += INGREDIENT_PRICE[action.ingredientName];
            updatedState.building = true; 
            return updatedState;
        case actionTypes.REMOVE_INGREDIENT:
                updatedState.ingredients[action.ingredientName] -= 1 ;
                updatedState.totalPrice += INGREDIENT_PRICE[action.ingredientName] ;
                updatedState.building = true;
                return updatedState;
        // For fetching ingredients from server
        case actionTypes.SET_INGREDIENTS:
            updatedState.ingredients = action.ingredients;
            updatedState.error = false;
            updatedState.totalPrice = 4;
            updatedState.building = false; 
            return updatedState;
        case actionTypes.FETCH_INGREDIENT_FAILED:
            updatedState.error = true;
            return updatedState;
        default: return state;
    }
}

export default reducer;