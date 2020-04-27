import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import classes from './batch.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/Button/button';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/index'
import {checkValidity} from '../../shared/utility'

class Batch extends Component {
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthBatch(this.props.token,this.state.batchForm.batchId.value, this.state.batchForm.batchPassword.value);
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
    constructor(props) {
        super(props);
        this.state = {
            batches:[],
            batchForm: {
                batchId:{
                    elementType:'select',
                    elementConfig:{
                        options: []
                    },
                    valid:true,
                    validation:{},
                    value:''
                },
                batchPassword:{
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
            formIsValid:false
        }    
               
    }
    componentDidMount() {
        //const queryParams = '?auth=' + this.props.token +'&orderBy="evalid"&equalTo="'+this.props.userId+'"'     
        axios.get('/batch.json?auth='+this.props.token)
        .then(res => {
            const fdata = [];
            for (let key in res.data) {
                if (key === 'batchid')
                    fdata.push(res.data.batchid);}
            this.setState({batches:[...fdata]});
            this.createSelect();
            })
            .catch(err => {
                console.log(err);
            });         
    }
    createSelect () {
        const updatedForm = {
            ...this.state.batchForm
        };
        const updateElement = {
            ...updatedForm['batchId']
        };
        const updateConfig = {
            ...updateElement['elementConfig']
        };         
        this.state.batches.map(id => updateConfig['options'].push({'value':id, 'displayvalue':id}));
        updateElement.touched=true;
        updateElement.valid = checkValidity(updateElement.value, updateElement.validation);
        updateElement['elementConfig'] = updateConfig;
        updatedForm['batchId'] = updateElement;    
        this.setState({controls : updatedForm});
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
                <Button clicked={this.submitHandler} btnType="Success">SUBMIT</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading:state.batch.loading,
        token:state.auth.token,
        userId:state.auth.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthBatch: (token,batchId, batchPassword) => dispatch(actions.authBatch(token,batchId, batchPassword)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Batch,axios));