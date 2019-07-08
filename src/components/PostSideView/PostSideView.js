import React, { useState, useEffect } from 'react';
import "./PostSideView.css";
import { withFirebase } from '../Firebase';


function PostSideView({event, eventID, firebase}) {
    const [buttonText, setButtonText] = useState("Sign Up!");
    const [subscribed, setSubscribed] = useState(0);
    useEffect(() => {
        const { user } = firebase; 

        if(Object.keys(event).length && user) {
            
            // If subscriber array, check for the user's uid
            const found = event.subscribers ? event.subscribers.some(el => el === firebase.user.uid) : null;

            if(found)  {
                setButtonText("Unsubscribe");
                setSubscribed(true);
            }     
            
            else {
                setButtonText("Sign Up!");
                setSubscribed(false);
            }     
        }

        else if(!user) {
            setButtonText("Please login to sign up");
        }

    });

    function handleSubscribe() {

        if(!subscribed) {
            setButtonText("Unsubscribe");

            firebase.firebase.events().doc(eventID).update({
                subscribers: firebase.firebase.ArrayUnion(firebase.user.uid)
            });

            setSubscribed(true);
        }

        else {
            setButtonText("Sign Up!");
            
            firebase.firebase.events().doc(eventID).update({
                subscribers: firebase.firebase.ArrayRemove(firebase.user.uid)
            });

            setSubscribed(false);

        }
    }
    
    return (
        <div className={`post-side-view ${eventID ? "open" : ""}`}>
            <div className="side-view-top-image">
                <img src={event.image} />
            </div>
            <div className="side-view-body">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                
            </div>
            <div className="side-view-bottom">
                <button disabled={buttonText === "Please login to sign up" ? true : false} className={subscribed ? "unsubscribe" : null} onClick={handleSubscribe}>{buttonText}</button>
            </div>
        </div>
    );
}

export default withFirebase(PostSideView);