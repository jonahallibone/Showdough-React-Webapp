import React, { useState, useEffect } from 'react';
import "./PostEditor.css";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { withFirebase } from '../Firebase';
import Dropzone from 'react-dropzone'
import { FiX} from "react-icons/fi";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';



class PostEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            payout: '',
            title: '',
            description: '',
            coordinates: {},
            files: []
        };

        this.locationField = React.createRef();
    }
    
    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({address: address});
        this.locationField.blur();
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log(latLng)
                this.setState({coordinates: latLng})
            })
            .catch(error => console.error('Error', error));
    }

    addNewEvent = async (e) => {
        e.preventDefault();
        
        const {user, firebase} = this.props.firebase;
        await firebase.events().add({
            date: this.state.date,
            description: this.state.description,
            image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg",
            location: firebase.Geopoint(this.state.coordinates.lat, this.state.coordinates.lng),
            payout: this.state.payout,
            title: this.state.title,
            userID: user.uid
        })
    }

    setFiles(acceptedFiles) {
        this.setState({files: acceptedFiles});
    }

    getPreviews() {
        const {files} = this.state;

        if(files.length) {
            return files.map(file => {
                const url = URL.createObjectURL(file);

                return(
                    <img src={url} className="img-block" key={url}/>
                )
            })
        }

        else return;
    }

    cancelPreviews = () => {
        this.setState({files: []})
    }

    handleDayChange = day => {
        this.setState({ selectedDay: day });
    }
    
    render() {
        return(
            <div className="post-editor">
                <h3>Create New Post</h3>
                <form>
                    <div className="input-container col-span-6">
                        <Dropzone onDrop={acceptedFiles => this.setFiles(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    { 
                                    !this.state.files.length ?
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <span className="dropzone">Drag & drop or click to upload event header image.</span>
                                        </div>
                                    :
                                        <div className="thumbnails">
                                            <div className="cancel-button" onClick={this.cancelPreviews}>
                                                <FiX size="1.23rem" color="#FFF"/>
                                            </div>
                                            {this.getPreviews()}
                                        </div>
                                    }
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="input-container col-span-6">
                        <label>Event Title</label>
                        <input type="text" />
                    </div>
                    <div className="input-container col-span-6">
                        <label>Payout</label>
                        <input type="text" />
                    </div>
                    <div className="input-container col-span-6">
                        <label>Date</label>
                        <DayPickerInput
                            onDayChange={this.handleDayChange}
                            formatDate={formatDate}
                            parseDate={parseDate}
                            placeholder={`${formatDate(new Date())}`}
                        />
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
                                ref={el => this.locationField = el}
                                />
                                <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className
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
                        <button className="add-new-event" onClick={this.addNewEvent}>
                            Add New Event
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withFirebase(PostEditor);