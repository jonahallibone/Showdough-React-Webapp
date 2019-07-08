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

            this.findOrCreateUser(socialAuthUser);
        })
        .catch(error => {
          this.setState({ error });
        });
  
    }

    findOrCreateUser = async (socialAuthUser) => {
        const doc = await this.props.firebase.firebase.users().doc(socialAuthUser.user.uid).get()
            .then(snapshot => {
                if(!snapshot.exists) {
                    this.props.firebase.firebase.users().doc(socialAuthUser.user.uid)
                    .set({
                        user_id: socialAuthUser.user.uid,
                        lastLogin: new Date().getTime()
                    })
                }

                else if (snapshot.exists) {
                    this.props.firebase.firebase.users().doc(socialAuthUser.user.uid).update({
                        lastLogin: new Date().getTime()
                    })
                }
            })

        return doc;
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