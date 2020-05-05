import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect} from 'react-router-dom';
import Logout from '../src/containers/Auth/logout/logout';
import MarksEntry from '../src/containers/MarksEntry/marksEntry'
import MarksMain from '../src/containers/marksmain/marksMain'
import asyncComponent from '../src/hoc/asyncComponent/asyncComponent';



const asyncAuth = asyncComponent(() => {
  return import('../src/containers/Auth/Auth');
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={MarksMain} />
      <Redirect to="/" />
    </Switch>
    );
    if (this.props.isAuth)
      routes = (
      <Switch>
        <Route path="/marksentry" component={MarksEntry} />
        
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={MarksMain} />
      </Switch>
      );
    return (
      <div>
       <Layout>
         {routes}
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth:state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup:() => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
