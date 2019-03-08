import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from '../Firebase';

class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = { error: null };
    }    

    loginWithFacebook = () => {
        const {setUser} = this.props.firebase

        // console.log(this.props)
        this.props.firebase.firebase
        .doSignInWithFacebook()
        .then(socialAuthUser => {
            console.log(socialAuthUser);
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
            <div>
                <button onClick={this.loginWithFacebook}>Login with Facebook</button>
            </div>
        )
    }
}

export default withFirebase(Login);