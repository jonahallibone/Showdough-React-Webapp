import React, { useState,useRef, useEffect } from 'react';
import "./PostSideView.css";
import { withFirebase } from '../Firebase';


function PostSideView({selectedEvent, firebase}) {
    const signUpButton = useRef(null);
    const [buttonText, setButtonText] = useState(0);

    useEffect(() => {
        console.log(selectedEvent);
        if(selectedEvent.subscribers) {
            const found = selectedEvent.subscribers.some(el => el.id === firebase.user.uid);
            if(found)  {
                setButtonText("Signed Up!");
                signUpButton.current.disabled = true;
            }           
        }

        else {
            setButtonText("Sign Up!")
            signUpButton.current.disabled = false;
        }
    });

    async function handleSubscribe() {
        signUpButton.current.disabled = true;

        await firebase.firebase.events().doc(selectedEvent.id).update({
            subscribers: firebase.firebase.ArrayUnion({
                name: firebase.user.displayName,
                profile_picture: firebase.user.photoURL,
                id: firebase.user.uid
            })
        })

        setButtonText("Signed Up!")

    }
    
    return (
        <div className={`post-side-view ${Object.keys(selectedEvent).length ? "open" : ""}`}>
            <div className="side-view-top-image">
                <img src={selectedEvent.image} />
            </div>
            <div className="side-view-body">
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.description}</p>
                <ul>
                    {selectedEvent.subscribers ? selectedEvent.subscribers.map(el => <li key={el.id}>{JSON.stringify(el)}</li>) : null}
                </ul>
            </div>
            <div className="side-view-bottom">
                <button ref={signUpButton} onClick={handleSubscribe}>{buttonText}</button>
            </div>
        </div>
    );
}

export default withFirebase(PostSideView);