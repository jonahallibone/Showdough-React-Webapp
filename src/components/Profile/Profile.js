import React, {useState} from 'react';

import "./Profile.css";
import PostEditor from '../PostEditor/PostEditor';
import { withFirebase } from '../Firebase';
import {withRouter} from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    navToNewEvent = () => {
        const {history} = this.props;
        console.log(this.props)
        history.push("/new-event")
    }

    render() {
        const { user } = this.props.firebase
        return(
            <div id="profile">
                <div className="profile-header">
                    <button className="add-new-event" onClick={this.navToNewEvent}>
                        Add New Event
                    </button>
                </div>
                <div className="profile-content">
                    <div className="main-profile-content">
                        <h4 className="text-black">Welcome back, {user.displayName}.</h4>
                        <h3 className="text-grey padding-top-1-rem">You are currently scheduled for 0 events.</h3>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withFirebase(withRouter(Profile));