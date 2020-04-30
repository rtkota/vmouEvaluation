import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount() {
        this.props.onlogout();
        this.props.onlogoutinit();
    }
    render () {
        return (
            <Redirect to="/" />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onlogout:() => dispatch(actions.logout()),
        onlogoutinit:() => dispatch(actions.initializeBatch())
    }
}

export default connect(null,mapDispatchToProps)(Logout);