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
        const {center} = this.props;
        console.log(center);

        return (    
            center !== null ?
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: parseFloat(center.latitude), lng: parseFloat(center.longitude) }}
                >
                {this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            </GoogleMap>
            :
            <div></div>
        )
    }
}

export default withScriptjs(withGoogleMap(EventMap));
