import React, { useState, useEffect } from 'react';
import "./PostSideView.css";
import { withFirebase } from '../Firebase';


function PostSideView({event, eventID, firebase}) {
    const [buttonText, setButtonText] = useState("Sign Up!");

    useEffect(() => {

        if(Object.keys(event).length) {

            const found = event.subscribers.some(el => el.id === firebase.user.uid);
            console.log(found);
            if(found)  {
                console.log("signed up");
                setButtonText("Signed Up!");
            }     
            
            else {
                setButtonText("Sign Up!")
            }     
        }

    });

    function handleSubscribe() {
        
        setButtonText("Signed Up!")

        firebase.firebase.events().doc(eventID).update({
            subscribers: firebase.firebase.ArrayUnion({
                name: firebase.user.displayName,
                profile_picture: firebase.user.photoURL,
                id: firebase.user.uid
            })
        });

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
                <button disabled={buttonText === "Signed Up!" ? true : false} onClick={handleSubscribe}>{buttonText}</button>
            </div>
        </div>
    );
}

export default withFirebase(PostSideView);