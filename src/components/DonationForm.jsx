// src/components/DonationForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import "./DonationForm.css";

const DonationForm = ({ eventId, userId }) => {
  const [amount, setAmount] = useState(10);  // Default amount of $10
  const stripe = useStripe();
  const elements = useElements();

  const handleDonate = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      // Step 1: Create a Payment Intent by calling the backend
      const response = await fetch("http://localhost:3001/payment/create-payment-intent", {
        method: "POST",  // Ensure the method is POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }),  // Send the donation amount in cents
      });
      
      const data = await response.json();

      if (data.clientSecret) {
        // Step 2: Confirm the payment using the client secret
        const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: userId,  // Use the user's name here or provide an appropriate detail
            },
          },
        });

        if (error) {
          console.error(error);
          alert("Payment failed. Please try again.");
        } else if (paymentIntent.status === "succeeded") {
          // Step 3: Record the donation in Firebase
          const donationRef = collection(db, "donations");
          await addDoc(donationRef, {
            userId,
            eventId,
            amount,
            timestamp: new Date(),
          });
          
          alert(`Donation of $${amount} successful!`);
        }
      }
    } catch (error) {
      console.error("Error processing donation:", error);
      alert("Donation failed, please try again.");
    }
  };

  return (
    <form onSubmit={handleDonate} className="donation-form">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        placeholder="Donation Amount ($)"
        required
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>Donate ${amount}</button>
    </form>
  );
};

export default DonationForm;
