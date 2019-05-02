import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import EventListing from "../EventListing/EventListing";
import PostSideView from "../PostSideView/PostSideView";

import "./MainList.css";
import EventMap from '../EventMap/EventMap';

class MainList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          events: [],
          selectedEvent: {},
          selectedEventID: null
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
        const { firebase } = this.props;
        const { selectedEventID } = this.state;

        //Close if already open
        console.log(selectedEventID === event.id, selectedEventID, event.id)
        if(selectedEventID === event.id) {
            this.setState({ selectedEventID: null });
            return;
        }

        firebase.firebase.events().doc(event.id).onSnapshot((doc) => {
            console.log(doc.data());

            this.setState({selectedEvent: doc.data(), selectedEventID: event.id});

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
                    {events.map((event, index) => <EventListing onClick={() => this.setSelectedEvent(event)} event={event} key={`event-${index}`}/>)}
                </div>
            </div>
        )
    }
    
    renderMap() {
        const {selectedEvent, selectedEventID, events} = this.state;
        return (
            <div className="event-map-main" style={{position: "relative"}}>
                <PostSideView 
                    event={selectedEvent} 
                    eventID={selectedEventID}
                />
                <EventMap 
                    events={events}
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