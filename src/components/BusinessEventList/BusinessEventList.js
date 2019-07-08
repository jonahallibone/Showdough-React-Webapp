import React, {useState, useEffect} from "react";
import { withFirebase } from '../Firebase';
import EventListing from "../EventListing/EventListing";
import {withRouter} from "react-router-dom";

const BusinessEventList = ({firebase, history}) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        if(firebase.user) {
            getBusinessEvents();
        }
    },[firebase])

    const getBusinessEvents = async () => {
        await firebase.firebase.events().where("userID", "==", firebase.user.uid).get().then(snapShot => {
            console.log(snapShot)
            const events = snapShot.docs.map(doc => ({...doc.data(), id: doc.id}));
            console.log(events);
            setEvents(events);
        });
    }

    const listEvents = () => {
        return events.map((event, index) => {
            return <EventListing onClick={() => navToMembersPage(event.id)} event={event} key={`event-${index}`}/>
        })
    }

    const navToMembersPage = (eventId) => {
        console.log(history);

        history.push(`/business/events/${eventId}`)
    }

    return(
        <div className="profile-content">
            <div className="main-profile-content">
                <h3 className="text-grey padding-top-1-rem">You are currently have {events.length} events published.</h3>
                <div className="event-list profile-list">
                    {listEvents()}
                </div>
            </div>
        </div>
    )
}

export default withRouter(withFirebase(BusinessEventList));