import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Batch from '../batch/batch';
import Marks from '../../components/marks/marks';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


class MarksEntry extends Component {
   state = {
        marksDisplay:false
    }
    
    entrySavedHandler = () => {
        if (this.props.isAuth) {
            
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    }

    entryCancelledHandler = () => {
        this.setState({marksDisplay:false});
    }

    entrySubmitHandler = () => {
        
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
        isAuth:state.auth.token!==null
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        // onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        // onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
        // onInitIngredients: () => dispatch(actions.initIngredients()),
        // onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(MarksEntry,axios));