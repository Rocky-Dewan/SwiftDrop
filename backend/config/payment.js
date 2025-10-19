import Stripe from "stripe";
const stripeKey = process.env.STRIPE_SECRET_KEY || "";
export const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: "2022-11-15" }) : null;

// helper: create payment intent (example)
export const createPaymentIntent = async ({ amount, currency = "bdt" }) => {
  if (!stripe) throw new Error("Stripe not configured");
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"]
  });
  return paymentIntent;
};
