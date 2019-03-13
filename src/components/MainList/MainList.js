import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';
import EventListing from "../EventListing/EventListing";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import "./MainList.css";
import EventMap from '../EventMap/EventMap';

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
        await this.props.firebase.firebase.events().onSnapshot((querySnapshot) => {

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
                <h4>Explore all 1+ Events</h4>
                <div className="event-list">
                    {loading && <div>Loading ...</div>}
                    {events.map((event, index) => <EventListing event={event} key={`event-${index}`}/>)}
                </div>
            </div>
        )
    }
    
    renderMap() {
        const {location} = this.props.firebase;
        return (
           <EventMap 
            isMarkerShown
            center={this.props.firebase.location ? this.props.firebase.location.coords : null}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDoKI2dCYabfoaGRw0ah-PEkqZyGBjDES0&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
           />
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