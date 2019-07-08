import React, {useState, useEffect} from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";
import QrReader from 'react-qr-reader'

import styles from "./EventMembers.module.css";

const EventMembers = ({firebase, match}) => {
    const [users, setUsers] = useState([]);
    const [openScanner, setOpenScanner] = useState(false);
    const [event, setEvent] = useState({});
    useEffect(() => {
        getEventData();
    }, [])

    const getUserData = async (subscriber) => {
        const user = await firebase.firebase.users().doc(subscriber).get();
        return user.data();
    }

    const getEventData = async () => {
        await firebase.firebase.events().doc(match.params.id).onSnapshot(async (event) => {
            if(event.exists && event.data().subscribers) {
                setEvent(event.data());
                const getUsers = await Promise.all(event.data().subscribers.map(getUserData));
                console.log(getUsers);
                setUsers(getUsers);
            }
        });
    }

    const isUserValidated = userID => {
        // console.log(event.validated.includes(userID), userID);
        if(!event.validated) return;
        return event.validated.includes(userID);
    }

    const listUsers = () => {

        return (
            users.map(user =>  {
                const userValidated = isUserValidated(user.uid);
                return (
                    <li className={styles["member"]}>
                        <div className={styles["member-image"]}>
                            <img src={user.photoURL} />
                        </div>
                        <div className={styles["member-name"]}>
                            <span>{user.displayName}</span>
                        </div>
                        <div className={`
                            ${styles[userValidated ? "member-validated-true" : "member-validated-false"]} 
                            ${styles["member-validated"]}
                        `}>
                            {userValidated  ? "Checked In! Scan again to checkout." : "Not Checked In!"}
                        </div>
                        <div className={styles["member-qr"]}>
                            <QRCode value={user.uid} size={70} />
                        </div>
                    </li>
                )
            })
        )
    }

    const displayUserList = () => {
        return(
            <ul className={styles["members-list"]}>
                {listUsers(users)}
            </ul>
        )
    }

    const handleScan = data => {
        console.log(data);
        if(data) {
            firebase.firebase.events().doc(match.params.id).update({
                validated: firebase.firebase.ArrayUnion(data)
            });

            setOpenScanner(false);
        }
    }

    return(
        <>  
            <h3>USERS</h3>
            <button onClick={() => setOpenScanner(!openScanner)}>Open Scanner</button>
            {
                openScanner ? 
                <QrReader
                    delay={300}
                    onError={error => console.log(error)}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                /> :
                null
            }

            <div>
                {displayUserList()}
            </div>
        </>
    )
}

export default withRouter(withFirebase(EventMembers));