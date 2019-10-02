import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from "./CheckoutForm";
import { withFirebase } from "../Firebase";
import styles from "./ProfileSettings.module.css";


const ProfileSettings = ({firebase}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log(firebase);
        if(!firebase.user) {
            return;
        }

        firebase.firebase.users().doc(firebase.user.uid).get().then(snapShot => {
            if(snapShot.exists) {
                setUser(snapShot.data());
            }
        });
            
    }, [setUser, firebase])

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Container>
            <Row>
                <Col xs={12} sm={6}>
                    <h2>Add a card to your account</h2>
                    {user.card ? 
                    <div className={styles.current_card__info}>
                        <h6>Currently Active Card</h6>
                        <div>
                            <strong>Brand:</strong> {user.card.brand}
                        </div>
                        <div>
                            <strong>Last 4: </strong>{user.card.last4}
                        </div>
                        <div>
                            <strong>Exp: </strong>{user.card.exp_month}/{user.card.exp_year}
                        </div>
                    </div>
                    :
                    <div></div>
                    }
                    <StripeProvider apiKey="pk_test_HHv3GbIGGrKu4WS2Gk78WkBf">
                        <Elements>
                            <CheckoutForm user={user}/>
                        </Elements>
                    </StripeProvider>
                </Col>
            </Row>
        </Container>
    )
}

export default withFirebase(ProfileSettings);