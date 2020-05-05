import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/Button/button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../shared/utility';
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';

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
        isSignUp:false,
        uimage:null,
        webCamEnabled:false
    }
     submitHandler = async (event) => {
        event.preventDefault();
        try{
            await this.capture();
            await this.setState({isSignUp:false});
            await this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp,this.state.uimage);
            const MODEL_URL = '/models'
        
            await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
            await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
            await faceapi.loadFaceRecognitionModel(MODEL_URL);
        
        
            let scoreThreshold = 0.5;
            let inputSize = 512
            const OPTION = new faceapi.TinyFaceDetectorOptions({
                inputSize,
                scoreThreshold
            });
            const useTinyModel = true;  
            const img1 = await faceapi.fetchImage(this.state.uimage);   
            const fullFaceDescription1 = await faceapi.detectSingleFace(img1,OPTION).withFaceLandmarks(useTinyModel).withFaceDescriptor();
            if (!fullFaceDescription1) {
                throw new Error(`no faces detected in Captured Image`)
            }  
            
            const faceDescriptor1 = fullFaceDescription1.descriptor;

            const img = await faceapi.fetchImage(localStorage.getItem('uimage'));    
            const fullFaceDescription = await faceapi.detectSingleFace(img,OPTION).withFaceLandmarks(useTinyModel).withFaceDescriptor();
            if (!fullFaceDescription1) {
                throw new Error(`no faces detected stored Images`)
            } 
            const faceDescriptor = fullFaceDescription.descriptor; 

            const maxDescriptorDistance = 0.5;
            const faceMatcher = new faceapi.FaceMatcher(faceDescriptor, maxDescriptorDistance);

            const results = faceMatcher.findBestMatch(faceDescriptor1);
            if (!results) {
                alert("Face Detection Unsuccessful");
                this.props.onlogout();
                this.props.onlogoutinit();
            } 
        }
        catch (err){
            if (!this.props.error)
                alert(err.message);
            this.props.onlogout();
            this.props.onlogoutinit();
        }
        
    }

    switchAuthModeHandler = async (event) => {
        event.preventDefault();
        await this.capture();
        await this.setState({isSignUp:true});
        await this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp,this.state.uimage);
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
        this.setState({webCamEnabled:true});
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
        this.props.onSetAuthRedirectPath();
        }
    }
    setRef = webcam => {
        this.webcam = webcam;
      };
    
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({uimage:imageSrc});
        this.setState({webCamEnabled:false});
        
    };

    render () {
        const videoConstraints = {
            width: 1280,
            height: 900,
            facingMode: "user"
          };
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
        let webcam = <Webcam
            audio={false}
            height={250}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={250}
            videoConstraints={videoConstraints}
            />;
 //           <button onClick={this.capture}>Capture photo</button></div>;
        if (!this.state.webCamEnabled && !this.props.error)
            webcam=null;
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
                {webcam}
                <p></p>
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
        onAuth: (email, password, isSignup,img) => dispatch(actions.auth(email, password,isSignup,img)),
        onSetAuthRedirectPath:() => dispatch(actions.setAuthRedirectPath('/')),
        onlogout:() => dispatch(actions.logout()),
        onlogoutinit:() => dispatch(actions.initializeBatch())
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