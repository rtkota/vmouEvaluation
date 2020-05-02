import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './marksmain.module.css';
import vmouLogo from '../../assets/logo.png'

class MarksMain extends Component {
    render () {
        return (
            <div className={classes.App}>
                <div className={classes.card}>
                    <img className={classes.logo} fluid src={vmouLogo} alt=" "/>
                </div>
                
                <h1>Important Instructions</h1>
            </div>
        )
    }
}

export default MarksMain;