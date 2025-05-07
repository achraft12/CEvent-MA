import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationForm from "../components/DonationForm";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Donation = () => {
  const { id } = useParams(); // eventId from URL
  const { user } = useAuth(); // user from context

  return (
    <div className="donation-page">
      <Elements stripe={stripePromise}>
        <DonationForm eventId={id} userId={user ? user.uid : ""} />
      </Elements>
    </div>
  );
};

export default Donation;
