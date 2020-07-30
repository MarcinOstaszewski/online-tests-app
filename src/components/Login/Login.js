import React, { Component } from 'react';
import { firebase, googleAuth} from '../../firebase';

import style from './Login.module.css';

class Login extends Component {
    state = {
        status: false
    }
    signIn = () => {
        console.log('signIn')
        firebase.auth().signInWithPopup(googleAuth);
    }

    signOut = () => {
        console.log('OUT')
        firebase.auth().signOut()
    }

    componentDidMount() {
        // firebase.auth().onAuthStateChanged(user => {
        //     this.props.handleLoginStatus(user)
        // })
    }

    render() {
        // if (firebase.auth().currentUser) {
        //     console.log(firebase.auth().currentUser.displayName, firebase.auth().currentUser.email)
        // }
        return ( 
            <div className={style.login}>
                { this.state.status ? 
                    <div className={style.loginButton} onClick={this.signIn}>LOGIN</div> 
                    :
                    <div className={style.logOutButton} onClick={this.signOut}>LOG OUT</div> 
                }
            </div>
        );
    }
}

export default Login;