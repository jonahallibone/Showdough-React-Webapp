import React, { useState, useEffect } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';

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

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Formik } from 'formik';


import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';
import CheckOut from './CheckOut/CheckOut';



class PostEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            payout: '',
            title: '',
            description: '',
            coordinates: {},
            files: [],
            percentage: 0,
            fileURL: "",
            uploading: false,
            doSubmit: false
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

    setFiles(acceptedFiles) {
        console.log(acceptedFiles);
        this.setState({files: acceptedFiles});
    }

    addNewEvent = async (values) => {

        const {user, firebase} = this.props.firebase;
        const {files} = this.state;
        
        //check for files
        if(!files.length) return;

        //Set up filename and upload task
        const fileName = `${files[0].name.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`;
        let uploadTask = firebase.storage.child(fileName).put(files[0]);
    
        this.setState({doSubmit: true})

        uploadTask.on('state_changed', 
            snapshot => this.handleUploadStateChange(snapshot),
            error => this.handleUploadError(error),
            () => this.handleUploadSuccess(uploadTask, values) 
        );
    }

    handleUploadStateChange(snapshot) {
        this.setState({uploading: true})
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({percentage: Math.round(progress)});
    }

    handleUploadError(error) {
        console.log(error);
    }

    handleUploadSuccess = (uploadTask, values) => {
        const {user, firebase} = this.props.firebase;
        console.log(values);
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            firebase.events().add({
                date: this.state.date,
                description: values.eventDescription,
                image: downloadURL,
                location: firebase.Geopoint(this.state.coordinates.lat, this.state.coordinates.lng),
                payout: values.eventPayout,
                title: values.eventTitle,
                userID: user.uid,
                time: values.eventTime,
                endTime: values.endTime,
                participants: values.eventParticipants,
                subscribers: []
            }).then(() => {
                document.location = "/events";
            });
        });
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
        this.setState({ date: day });
    }

    
    
    render() {
        const { percentage } = this.state;

        const initialFormValues = {
            eventTitle: "",
            eventPayout: "",
            eventDescription: "",
            eventParticipants: 0,
            eventTime: "10:00AM",
            endTime: "11:00AM"
        };
          
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
                </form>
                <Formik
                initialValues={initialFormValues}
                onSubmit={(values) => {
                        console.log(values);
                        this.addNewEvent(values);
                    }
                }
                  render={({
                    values,
                    handleChange,
                    handleSubmit,
                  }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="input-container col-span-6">
                                <label>Event Title</label>
                                <input 
                                    type="text" 
                                    name="eventTitle" 
                                    value={values.eventTitle} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="input-container col-span-6">
                                <label>Payout</label>
                                <input 
                                    type="text" 
                                    name="eventPayout" 
                                    value={values.eventPayout} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-container col-span-6">
                                <label>Particpants</label>
                                <input 
                                    type="text" 
                                    name="eventParticipants" 
                                    value={values.eventParticipants} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-container col-span-6">
                                <label>Start Time</label>
                                <input 
                                    type="text" 
                                    name="eventTime" 
                                    value={values.eventTime} 
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-container col-span-6">
                                <label>End Time</label>
                                <input 
                                    type="text" 
                                    name="endTime" 
                                    value={values.endTime} 
                                    onChange={handleChange}
                                />
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
                                <textarea onChange={handleChange} name="eventDescription" value={values.eventDescription}/>
                            </div>
                            <StripeProvider apiKey="pk_test_HHv3GbIGGrKu4WS2Gk78WkBf">
                                <div className="example input-container col-span-6">
                                    <Elements>
                                        <CheckOut
                                            doSubmit={this.state.doSubmit}
                                        />
                                    </Elements>
                                </div>
                            </StripeProvider>
                            <div className="input-container col-span-6">
                                <button type="submit" className={`add-new-event ${this.state.uploading ? "hidden" : ""}`}>
                                    Add New Event
                                </button>
                                <div style={{width: "100px", height: "100px"}} hidden={!this.state.uploading}>
                                    <CircularProgressbar
                                        percentage={percentage}
                                        text={`${percentage}%`}
                                        styles={{
                                            path: { stroke: `rgba(46, 213, 115, 1)` },
                                            text: { fill: '#2ed573', fontSize: '0' },
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        )
    }
}

export default withFirebase(PostEditor);