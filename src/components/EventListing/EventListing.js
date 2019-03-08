import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TiStarFullOutline } from "react-icons/ti";
import { FiCalendar, FiMapPin, FiCreditCard } from "react-icons/fi";

import "./EventListing.css";
class EventListing extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const {event} = this.props;
        return(
            <div className="event-listing">
                <div className="event-listing-top">
                    <img src={event.image} alt="" className="img-block"/>
                </div>
                <div className="event-listing-bottom">
                    <div className="flex-row width-100 event-bottom-item justify-start">
                        <div className="flex-row">
                            <TiStarFullOutline color="#eccc68"/>
                            <span>4.5</span>
                        </div>
                        <div className="flex-row justify-center">
                            <FiCalendar color="#ff4757"/>
                            <span>{new Date(event.date.seconds*1000).toLocaleDateString()}</span>
                        </div>
                        <div className="flex-row justify-end">
                            <FiCreditCard color="#2ed573"/>
                            <span>$5</span>
                        </div>
                    </div>
                </div>
                <div className="event-listing-middle">
                    <p className="event-title">{event.title}</p>
                    <p className="event-description">{event.description}</p>
                </div>
            </div>
        )
    }
}

export default EventListing;