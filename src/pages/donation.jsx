import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationForm from "../components/DonationForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Donation = () => {
  return (
    <div className="donation-page">
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
};

export default Donation;
