import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './marksmain.module.css';
import vmouLogo from '../../assets/logo.png'

class MarksMain extends Component {
    render () {
        return (
            <div className={classes.App}>
                <div className={classes.card}>
                    <img className={classes.logo}  src={vmouLogo} alt=" "/>
                </div>
                <p></p>
                <p></p>
                <p></p>
                <h1>Important Instructions</h1>
                
                <p>1. Only incompleted batches will be displayed for Marks Entry.</p>
                <p>2. There are ONLY FIVE ATTEMPTS provided for filling the marks in each batch..</p>
            </div>
        )
    }
}

export default MarksMain;