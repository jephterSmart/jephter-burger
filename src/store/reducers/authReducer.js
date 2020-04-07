import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state=initialState,action) => {
    const updatedState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            updatedState.authRedirectPath = action.path;
            return updatedState;
        case actionTypes.AUTH_LOGOUT:
            updatedState.userId = null;
            updatedState.token = null;
            return updatedState;
        case actionTypes.AUTH_START:
            updatedState.loading = true;
            updatedState.error = null;
            return updatedState;
        case actionTypes.AUTH_SUCCESS:
            updatedState.token = action.idToken;
            updatedState.userId = action.userId;
            updatedState.loading = false;
            return updatedState;
        case actionTypes.AUTH_FAIL:
            updatedState.loading = false;
            updatedState.error = action.error
            return updatedState;
        default: return updatedState;
    }
}

export default reducer;