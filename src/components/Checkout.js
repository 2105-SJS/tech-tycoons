import React, {useEffect, useState} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "pk_test_51JusunD5T9FRXtu5HaKA85U7PgcMm0WUeGR70beFsYLtCc0Nn6leAI6xdKdJ3KFm2VJin9iSJh98SdyQkznUtXuv00tbmNlpFQ"
const stripePromise = loadStripe(stripeKey);


const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const dummyItem = {
          description: "The Hobbit",
          price: 12.99,
          imageURL:"",
          inStock: true,
          category:''
        }
        fetch("/api/orders/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [dummyItem] }),
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret)

          });
      }, []);

      const appearance = {
        theme: 'night',
      };
      const options = {
        clientSecret,
        appearance,
      };
    return <>
    {clientSecret && (
            <Elements options = {options} stripe = {stripePromise}>
              <CheckoutForm />
            </Elements>
          )}

    </>;
}

export default Checkout;