import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';
import EventListing from "../EventListing/EventListing";

import "./MainList.css";

class MainList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          events: []
        }
    }
    async componentDidMount() {
        this.setState({ loading: true});
        await this.props.firebase.events().onSnapshot((querySnapshot) => {

            let data = querySnapshot.docs.map(doc => {
                let out = doc.data()
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

    renderEvents = () => {
        const { events, loading } = this.state;

        return(
            <div className="main-list">
                {loading && <div>Loading ...</div>}
                {events.map(event => <EventListing event={event}/>)}
            </div>
        )
    }
    
    render() {
        return(
            <div className="main-list-container">
                {this.renderEvents()}
            </div>
        )
    }
}

export default withFirebase(MainList);