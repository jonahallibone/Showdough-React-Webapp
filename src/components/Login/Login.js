import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from '../Firebase';

import "./Login.css";

class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = { error: null };
    }    

    loginWithFacebook = () => {
        const {setUser} = this.props.firebase

        this.props.firebase.firebase
        .doSignInWithFacebook()
        .then(socialAuthUser => {
            this.setState({ error: null });
            setUser(socialAuthUser.user);

        //   this.props.history.push("/events");
        })
        .catch(error => {
          this.setState({ error });
        });
  
    }

    render() {
        return (
            <div className="login-window">
                <h3>Please login with one of the provided options</h3>
                <button onClick={this.loginWithFacebook} className="login-button facebook">Login with Facebook</button>
            </div>
        )
    }
}

export default withFirebase(Login);