import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';
import EventListing from "../EventListing/EventListing";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import PostSideView from "../PostSideView/PostSideView";

import "./MainList.css";
import EventMap from '../EventMap/EventMap';

class MainList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          events: [],
          selectedEvent: {}
        }
    }
    async componentDidMount() {
        this.setState({ loading: true});
        await this.props.firebase.firebase.events().orderBy("date", "asc").onSnapshot((querySnapshot) => {

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

    setSelectedEvent(event) {
        console.log(event);
        this.setState({selectedEvent: event});
    }

    renderEvents = () => {
        const { events, loading } = this.state;

        return(
            <div className="main-list">
                <h4>Explore all 1+ Events</h4>
                <div className="event-list">
                    {loading && <div>Loading ...</div>}
                    {events.map((event, index) => <EventListing onClick={() => this.setSelectedEvent(event)} event={event} key={`event-${index}`}/>)}
                </div>
            </div>
        )
    }
    
    renderMap() {
        const {selectedEvent} = this.state;
        return (
            <div style={{position: "relative"}}>
                <PostSideView selectedEvent={selectedEvent}/>
                <EventMap 
                events={this.state.events}
                isMarkerShown
                center={this.props.firebase.location ? this.props.firebase.location.coords : null}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
           </div>
        )
    }
    
    render() {
        return(
            <div className="main-list-container">
                {this.renderEvents()}
                {this.renderMap()}
            </div>
        )
    }
}

export default withFirebase(MainList);