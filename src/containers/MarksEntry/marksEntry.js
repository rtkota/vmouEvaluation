import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Batch from '../batch/batch';
import Marks from '../../components/marks/marks';
import axios from '../../axios-vmou';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

const _ = require('lodash');
class MarksEntry extends Component {
    entrySavedHandler = () => {
        if (this.props.isAuth) {
            var mnew = [];
            this.props.batchData.marks.map(m => mnew.push(_.pick(m,['controlno','award','status'])));
            const bdata = {
                status: this.props.batchData.status,
                marks:mnew
            }
            this.props.onEntrySaved(this.props.batchData._id,bdata,this.props.token);
        } else {
            this.props.history.push('/auth')
        }
    }

    entryCancelledHandler = () => {
        this.props.onEntryCancelled();
    }

    entrySubmitHandler = () => {
        if (this.props.isAuth) {
            var mnew = [];
            var chkall = true;
            for (var m in this.props.batchData.marks) {
                if (this.props.batchData.marks[m].award===0 && this.props.batchData.marks[m].status==='  ')
                    chkall=false;
            }
            if (!chkall) {
                alert("Batch Not Yet Completed..Cannot Submit, Use Save Instead")
                return;
            }
            this.props.batchData.marks.map(m => mnew.push(_.pick(m,['controlno','award','status'])));
            const bdata = {
                status: this.props.batchData.status,
                marks:mnew
            }
            this.props.onEntrySubmit(this.props.batchData._id,bdata,this.props.token);
            this.props.history.push('/logout')
        } else {
            this.props.history.push('/auth')
        }
    }
    render () {

        let marksDetail = null;
        if (this.props.batchData) {
            marksDetail = <Marks data={this.props.batchData}
                    entryCancelled={this.entryCancelledHandler}
                    entrySubmit={this.entrySubmitHandler}
                    entrySaved={this.entrySavedHandler}
          />;
        
        }
       
        if (this.props.loading)
            marksDetail = <Spinner />; 
        return ( 
            <Auxilary>
                <Batch />
                {marksDetail}
            </Auxilary>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        batchData: state.batch.batchData,
        error:state.batch.error,
        loading:state.batch.loading,
        isAuth:state.auth.token!==null,
        token:state.auth.token
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        onEntrySaved: (id,bd,token) => dispatch(actions.saveBatch(id,bd,token)),
        onEntrySubmit: (id,bd,token) => dispatch(actions.submitBatch(id,bd,token)),
        onEntryCancelled: () => dispatch(actions.submitBatchSuccess()),
        // onInitIngredients: () => dispatch(actions.initIngredients()),
        // onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(MarksEntry,axios));