// src/components/DonationForm.js
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./DonationForm.css"; // Optional styling

const DonationForm = () => {
  const [amount, setAmount] = useState(10);
  const stripe = useStripe();
  const elements = useElements();

  const handleDonate = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      const response = await fetch("/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }),
      });

      const { clientSecret } = await response.json();
      if (!clientSecret) {
        alert("Failed to initiate payment.");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: event.target.name.value },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        alert("Payment failed.");
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Thank you for your donation!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Try again later.");
    }
  };

  return (
    <div className="donation-form">
      <h2>Donate to Support Our Cause</h2>
      <form onSubmit={handleDonate}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          placeholder="Donation Amount ($)"
          required
        />
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Donate ${amount}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
