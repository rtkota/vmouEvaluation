import React, {Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../components/navigarion/toolbar/toolbar';
import Sidedrawer from '../../components/navigarion/SideDrawer/Sidedrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSidedrawer:false
    }

    sidedrawerClosedHandler = () => {
        this.setState({showSidedrawer:false})
    }

    sidedrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSidedrawer:!prevState.showSidedrawer};
         } );
    }
    render () {
        return (
        <Auxilary>
            <Toolbar isAuthenticate={this.props.isAuth} drawerToggleclicked={this.sidedrawerToggleHandler}/>
            <Sidedrawer  isAuthenticate={this.props.isAuth} open={this.state.showSidedrawer} closed={this.sidedrawerClosedHandler}/>
              
            <main className={classes.Content}>
            {this.props.children}
            <footer className={classes.Footer}> (c) Vardhaman Mahaveer Open University </footer>
            </main>      
        </Auxilary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth:state.auth.token!==null
    };
}

export default connect(mapStateToProps)(Layout);