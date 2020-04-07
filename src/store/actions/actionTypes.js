
// This belongs to the burger builder app
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
// This belongs to fetching ingredients from the server
export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const FETCH_INGREDIENT_FAILED = 'FETCH_INGREDIENT_FAILED';

// This belongs to pushing order to the server
export const PURCHASE_INIT = 'PURCHASE_INIT';
export const BURGER_PUCHASE_START = 'BURGER_PUCHASE_START';
export const BURGER_PURCHASE_SUCCESS = 'BURGER_PURCHASE_SUCCESS';
export const BURGER_PURCHASE_FAIL = 'BURGER_PURCHASE_FAIL';

// This belongs to fetching orders from server to orders page
export const FETCH_ORDER_START = 'FETCH_ORDER_START';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS'; 
export const FETCH_ORDER_FAIL = 'FETCH_ORDER_FAIL';

// this belongs to the authentication view
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';