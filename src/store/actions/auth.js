import * as actionTypes from './actionsTypes';
import axios from '../../axios-vmou';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token,id) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userID:id
    };
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    //localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expiresIn * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password  
        }
        //returnSecureToken:true
        var authOptions = {
            method: 'POST',
            url: '/auth',
            data: authData,
            json: true
          };
        //let url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYcN9HbFCgDUJfi9UAFMR13aiDn-NRMjE";
        if (isSignup)
            authOptions = {
                method: 'POST',
                url: '/users',
                data: authData,
                json: true
          };
        //    url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYcN9HbFCgDUJfi9UAFMR13aiDn-NRMjE';
        axios(authOptions)
        .then(response => {
            //const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.token);
            //localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.userId);
            dispatch(authSuccess(response.data.token, response.data.userId))
            //dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token=localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (new Date() > expirationDate) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token,localStorage.getItem('userId')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }

        }
    }
}