// server.js (CommonJS)
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const bodyParser = require("body-parser");

const app = express();
const stripe = new Stripe("your_stripe_secret_key_here"); // Replace with your actual key

app.use(cors());
app.use(bodyParser.json());

app.post("/payment/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
