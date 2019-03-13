import React, { useState, useEffect } from 'react';
import "./PostEditor.css";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

class PostEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { address: '' };
    }
    
    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
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
        return(
            <div className="post-editor">
                <h3>Create New Post</h3>
                <form>
                    <div className="input-container col-span-6">
                        <label>Event Title</label>
                        <input type="text" />
                    </div>
                    <div className="input-container col-span-6">
                        <label>Date</label>
                        <input type="text" />
                    </div>
                    <div className="input-container col-span-6">
                        <label>Location</label>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                                />
                                <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                    </div>
                    <div className="input-container col-span-6">
                        <label>Description</label>
                        <textarea />
                    </div>
                    <div className="input-container col-span-6">
                        <button className="add-new-event" onClick={this.navToNewEvent}>
                            Add New Event
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostEditor;