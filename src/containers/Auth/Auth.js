import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/Button/button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../shared/utility';
class Auth extends Component {
    state = {
        controls : {
            email: {
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your EMail ID'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:false
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.setState({isSignUp:false});
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState({isSignUp:true});
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.controls
        };
        const updateElement = {
            ...updatedForm[inputIdentifier]
        };
        updateElement.value= event.target.value;
        updateElement.touched=true;
        updateElement.valid = checkValidity(updateElement.value, updateElement.validation);
        updatedForm[inputIdentifier] = updateElement;
        
        this.setState({controls : updatedForm});

    } 
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
        this.props.onSetAuthRedirectPath();
        }
    }
    render () {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = formElementArray.map(formElement => (
                <Input 
                key={formElement.id}
                elementtype={formElement.config.elementType}
                elementconfig={formElement.config.elementConfig}
                elementvalue={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                validationErrorMessage={"Please Enter Valid " + formElement.id}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />))
        if (this.props.loading)
            form = <Spinner />
        let errorMsg = null;
        
        if (this.props.error)
            errorMsg=<p>{this.props.error.message}</p>
        let authRedirect=null;
        if (this.props.isAuth)
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form >
                    {form}    
                </form>
                <Button clicked={this.submitHandler} btnType="Success">Sign In</Button>
                <p></p>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">New User! Sign Up</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password,isSignup)),
        onSetAuthRedirectPath:() => dispatch(actions.setAuthRedirectPath('/'))
    };
};

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token!==null,
        authRedirectPath:state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);