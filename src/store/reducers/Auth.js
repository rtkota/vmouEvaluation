import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    token:null,
    userID:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START :
            return {
                ...state,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token:action.idToken,
                userID:action.userID,
                error:null,
                loading:false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error:action.error,
                loading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token:null,
                userID:null
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath:action.path
            }
        default : return state;
    }
}

export default reducer;