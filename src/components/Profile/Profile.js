import React, {useState} from 'react';

import "./Profile.css";
import PostEditor from '../PostEditor/PostEditor';
import { withFirebase } from '../Firebase';

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user } = this.props.firebase
        return(
            <div id="profile">
                <h4 className="sub">OVERVIEW</h4>
                <h1>Welcome back, {user.displayName}.</h1>
                <PostEditor />
            </div>
        )
    }
}

export default withFirebase(Profile);