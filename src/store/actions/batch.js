import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const fetchBatchesStart = () => {
    return {
        type:actionTypes.FETCH_BATCHES_START
    }
}
export const setBatches = (batches) => {
    return {
        type:actionTypes.SET_BATCHES,
        batches:batches
    }
}

export const fetchBatchesFailed = (err) => {
    return {
        type:actionTypes.FETCH_BATCHES_FAILED,
        error:err
    }
}

export const fetchBatches = (token,userId) => {
    return dispatch => {
        dispatch(fetchBatchesStart());
        //const queryParams = '?auth=' + token +'&orderBy="evalid"&equalTo="'+userId+'"'
     
        axios.get('/batch.json?auth='+token)
        .then(res => {
            
            const fdata = [];
            for (let key in res.data) {
                if (key === 'batchid')
                    fdata.push(res.data.batchid);}
            dispatch(setBatches(fdata));
            })
            .catch(err => {
                dispatch(fetchBatchesFailed(err));
            });
    }
}
export const authBatchSuccess = (batchdata) => {
    return {
        type:actionTypes.AUTH_BATCH_SUCCESS,
        batchData:batchdata
    };
};

export const authBatchFail = (error) => {
    return {
        type:actionTypes.AUTH_BATCH_FAILED,
        error:error
    }
}

export const authBatch = (token,id,pwd) => {
    return dispatch => {
        dispatch(authBatchStart());
        //const queryParams = ' +'&orderBy="batchid"&equalTo="'+id+'"'
        axios.get('/batch.json?auth=' + token)
        .then(res => {
            const fdata = [];
            console.log(res.data.marks);
            for (let key in res.data.marks) {
                fdata.push(res.data.marks[key]);}
            console.log(fdata);
                dispatch(authBatchSuccess(fdata));
            })
            .catch(err => {
                dispatch(authBatchFail(err));
            });
    }
}
export const authBatchStart = () => {
    return {
        type:actionTypes.AUTH_BATCH_START
    }
}