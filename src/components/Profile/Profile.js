import React, {useState} from 'react';

import "./Profile.css";
import PostEditor from '../PostEditor/PostEditor';
import { withFirebase } from '../Firebase';

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.addNewEvent = this.addNewEvent.bind(this);
    }

    async addNewEvent() {
        const {user, firebase} = this.props.firebase;
        await firebase.events().add({
            date: new Date("December 1, 2019"),
            description: "Lorem ipsum baby!",
            image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg",
            location: firebase.Geopoint(24.72504500749274, 58.74554729994484),
            payout: 4.5,
            title: "Test post",
            userID: user.uid
        })
    }

    render() {
        const { user } = this.props.firebase
        return(
            <div id="profile">
                <div className="profile-header">
                    <button className="add-new-event" onClick={this.addNewEvent}>
                        Add New Event
                    </button>
                </div>
                <div className="profile-content">
                    <h4 className="sub">OVERVIEW</h4>
                    <h1>Welcome back, {user.displayName}.</h1>
                    <PostEditor />
                </div>
            </div>
        )
    }
}

export default withFirebase(Profile);