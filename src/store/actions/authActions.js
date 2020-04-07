import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}
const authSuccess = (token,id) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: id
    }
}
const authFail = (err) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error: err
    }
}
export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
const checkauthentication = (expirationTime) =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, expirationTime * 1000);
    }
}
export const auth = (email,password,isSignUp)  =>{
    return dispatch => {
        dispatch(authStart())
        const API_KEY = 'AIzaSyAbQJjEG-6NgqHlFE-_3R9JoE5dlLEegdo';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
        if(!isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
            const formData = {
                email: email,
                password: password,
                returnSecureToken: true
            }
        axios.post(url,formData)
        .then(response =>{
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('expirationDate',expirationDate);

            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkauthentication(response.data.expiresIn))
        }) 
        .catch(err=>{
            dispatch(authFail(err.message === 'Network Error'? err :err.response.data.error));
        })
    }
}

// belongs to setting Authentication path

export const setAuthRedirectPath = path => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token) {
             dispatch(logout())
            
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate')).getTime()
            if(expirationDate > new Date().getTime()){
    
                dispatch(authSuccess(token,localStorage.getItem('userId')));
                dispatch(checkauthentication((expirationDate - new Date().getTime())/1000));

            }
            else{
                dispatch(logout())
            }
        }

    }
}