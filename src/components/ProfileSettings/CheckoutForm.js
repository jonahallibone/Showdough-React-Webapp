import React, { useEffect, useState } from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';
import Loader from "react-loader-spinner";
import { withFirebase } from '../Firebase';

const CheckoutForm = ({firebase, user, stripe}) => {
    const [isCreatingCharge, setIsCreatingCharge] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        console.log(stripe);
    }, [stripe]);
    
    const createToken = async (data) => {
        let { token } = await stripe.createToken(data);
        return token;
    }

    const createCharge = async () => {
        setIsCreatingCharge(true); 
        console.log(firebase)
        const token = await createToken({name: user.displayName});
            
        // Dirty check for token; continue if found
        // console.log(token);
        if(token === undefined) {
            setIsCreatingCharge(false);
            return; 
        }

        setFetching(true);

        try {
            const req = await fetch('https://us-central1-showdough-f33b9.cloudfunctions.net/createCard', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    stripe_token: token,
                    user: user,
                })
            }).then(res => {
                if(res.ok) return res.json();
            });

            if(req.response === "success") {
                setIsCreatingCharge(false);
                window.location.href = window.location.href;
            }
        }

        catch {
            console.error("Network Error!!!1");
        }

        setFetching(false);
    }

    return (
        <div className="checkout">
            <small><strong>Replace Card Below</strong></small>
            {
                fetching // If getting information about the user still
                ?
                <Loader type="Oval" color="#999" height={30} width={30} style={{margin: "1rem 0"}} />
                :
                <>
                    <div style={{marginTop: ".5rem" }}>
                        <CardElement />
                    </div>
                    <div>
                        {
                            isCreatingCharge // If the charge is currently happening
                            ?
                            <Loader type="Oval" color="#999" height={30} width={30} style={{margin: "1rem 0"}} />
                            :
                            <button onClick={createCharge} style={{width: "100%", marginTop: "1rem", background: "#1e90ff", color: "#FFF"}}>
                                Add Card
                            </button>
                        }
                    </div>
                </>
            }
            
        </div>
    )   
}

export default withFirebase(injectStripe(CheckoutForm));