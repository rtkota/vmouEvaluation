import * as actionTypes from './actionsTypes';
import axios from '../../axios-vmou';

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

// export const fetchBatches = (token,userId) => {
//     return dispatch => {
//         dispatch(fetchBatchesStart());
//         //const queryParams = '?auth=' + token +'&orderBy="evalid"&equalTo="'+userId+'"'
     
//         axios.get('/batch.json?auth='+token)
//         .then(res => {
            
//             const fdata = [];
//             for (let key in res.data) {
//                 if (key === 'batchid')
//                     fdata.push(res.data.batchid);}
//             dispatch(setBatches(fdata));
//             })
//             .catch(err => {
//                 dispatch(fetchBatchesFailed(err));
//             });
//     }
// }
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
        var authOptions = {
            method: 'GET',
            url: '/batch/'+id,
            headers : {
                'x-auth-token':token
            },
            json: true
          };
        axios(authOptions)
        .then(res => {
            const fdata = [];
            for (let key in res.data.marks) {
                fdata.push(res.data.marks[key]);}
                dispatch(authBatchSuccess(res.data));
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

export const initializeBatch = () => {
    return {
        type:actionTypes.INITIALIZE_BATCH
    }
}

export const saveBatch = (id,bd,token) => {
    return dispatch => {
        dispatch(saveBatchStart());
        var authOptions = {
            method: 'PUT',
            url: '/batch/save/'+id,
            data: bd,
            headers : {
                'x-auth-token':token
            },
            json: true
          };
          
        axios(authOptions)
        .then(res => {
                dispatch(saveBatchSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(saveBatchFail(err));
            });
    }
}

export const submitBatch = (id,bd,token) => {
    return dispatch => {
        dispatch(saveBatchStart());
        var authOptions = {
            method: 'PUT',
            url: '/batch/submit/'+id,
            data: bd,
            headers : {
                'x-auth-token':token
            },
            json: true
          };
          
        axios(authOptions)
        .then(res => {
                dispatch(submitBatchSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(saveBatchFail(err));
            });
    }
}

export const saveBatchStart = () => {
    return {
        type:actionTypes.AUTH_BATCH_START
    }
}

export const saveBatchSuccess = () => {
    return {
        type:actionTypes.SAVE_BATCH_SUCCESS,
    };
};

export const saveBatchFail = (error) => {
    return {
        type:actionTypes.AUTH_BATCH_FAILED,
        error:error
    }
}

export const submitBatchSuccess = () => {
    return {
        type:actionTypes.SUBMIT_BATCH_SUCCESS,
    };
};
