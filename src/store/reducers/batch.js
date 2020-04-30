import * as actionTypes from '../actions/actionsTypes';


const initialState = {
    batches: [],
    error:false,
    loading:false,
    batchData:null
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.INITIALIZE_BATCH:
                return {
                    ...state,
                    loading:false,
                    error:false,
                    batches: [],
                    batchData:null
                }
                case actionTypes.FETCH_BATCHES_START:
                return {
                    ...state,
                    loading:true
                }
        case actionTypes.SET_BATCHES:
            return {
                ...state,
                batches:[...action.batches],
                error:false,
                loading:false
            };
        case actionTypes.FETCH_BATCHES_FAILED:
            return {
                ...state,
                error:true,
                loading:false
            };
        case actionTypes.AUTH_BATCH_START:
            return {
                ...state,
                loading:true
                }
        case actionTypes.AUTH_BATCH_SUCCESS:
            return {
                ...state,
                batchData:action.batchData,
                error:false,
                loading:false
            };
        case actionTypes.AUTH_BATCH_FAILED:
            return {
                ...state,
                error:true,
                loading:false
            };
        case actionTypes.SAVE_BATCH_SUCCESS:
            return {
                ...state,
                error:false,
                loading:false
            };
        case actionTypes.SUBMIT_BATCH_SUCCESS:
            return {
                ...state,
                loading:false,
                error:false,
                batchData:null
            };
        default:
            return state;
    }
};

export default reducer;