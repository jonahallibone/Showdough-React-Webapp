import React, {useState, useEffect} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

const CheckoutForm = ({doSubmit, stripe, name}) => {
  const [transacting, setTransacting] = useState(false)
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if(doSubmit) {
      submit();
    }
  }, [doSubmit])

  const submit = async (ev) => {

    setTransacting(true);
    let {token} = await stripe.createToken({name: name});

    if(!token) {
        setTransacting(false);
        return;
    }

    let response = await fetch("https://us-central1-showdough-f33b9.cloudfunctions.net/createPayment", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          stripe_token: token.id,
          name: name,
      })
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            setError("Something went wrong. Please try again!")
            throw new Error('Something went wrong');
        }
    }).then((responseJson) => {
        setSuccess(true);
        setTransacting(false);
    })
    .catch((error) => {
        console.log(error)
        setTransacting(false);
    });
  }

  return (
    <div className="checkout">
      <CardElement />
  </div>
  );
}

export default injectStripe(CheckoutForm);