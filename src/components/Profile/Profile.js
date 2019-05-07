import React, {useState} from 'react';

import "./Profile.css";
import PostEditor from '../PostEditor/PostEditor';
import { withFirebase } from '../Firebase';
import {withRouter, Link} from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events: []
        }
    }

    componentDidMount() {
        this.getEventsForUser();
    }

    navToNewEvent = () => {
        const {history} = this.props;
        console.log(this.props)
        history.push("/new-event")
    }

    async getEventsForUser() {
        const { firebase, user } = this.props.firebase;
        console.log(typeof(user.uid))
        await this.props.firebase.firebase.events().where('subscribers', 'array-contains', user.uid).onSnapshot((querySnapshot) => {

            let data = querySnapshot.docs.map(doc => {
                let out = doc.data()
                console.log(out);
                out.id = doc.id;
                return out;
            });

            this.setState({
                events: data,
                loading: false
            })

            return true;

        });
    }

    render() {
        const { user } = this.props.firebase
        const { events } = this.state;

        return(
            <div id="profile">
                <div className="profile-header">
                    <button className="add-new-event" onClick={this.navToNewEvent}>
                        Add New Event
                    </button>
                    <Link to="/business" className="add-new-event" style={{marginLeft: "1rem"}}>
                        Add Business Account
                    </Link>
                </div>
                <div className="profile-content">
                    <div className="main-profile-content">
                        <h4 className="text-black">Welcome back, {user.displayName}.</h4>
                        <h3 className="text-grey padding-top-1-rem">You are currently scheduled for {events.length} events.</h3>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withFirebase(withRouter(Profile));