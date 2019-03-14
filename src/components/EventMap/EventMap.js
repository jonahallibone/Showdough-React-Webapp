import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class EventMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            geoposition: {}
        }
    }

    componentWillMount() {
    }

    render(){
        const {center, events} = this.props;
        console.log(events)
        return (    
            center !== null ?
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: parseFloat(center.latitude), lng: parseFloat(center.longitude) }}
                >
                { events.map((event, index) => <Marker key={index} position={{ lat: event.location._lat, lng: event.location._long }} />) }
            </GoogleMap>
            :
            <div></div>
        )
    }
}

export default withGoogleMap(EventMap);
