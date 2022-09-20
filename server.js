const express = require("express");
const app = express();

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_5oO9dOeopxOlriQgozzhTrRy00IP5uDVMg');
const domainURL = "http://localhost:3000";
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

// Fetch the Checkout Session to display the JSON result on the success page
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post("/create-checkout-session", async (req, res) => {
  const { credit, method } = req.body;
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the form
  // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  let item;
  if(method === "1"){
    item = {
      price: "price_1Lk7B0GK9ys5fRnA03baRed0",
      quantity: parseInt(credit)
    }
  } else {
    item = {
      price: parseInt(credit) === 5?"price_1LkBdOGK9ys5fRnAhDI7fOo3":"price_1LkBiMGK9ys5fRnAjhOyThZd",
      quantity: 1
    }
  }
  console.log(typeof method, item)
  try {
    const session = await stripe.checkout.sessions.create({
      mode: method==1 ? "payment" : "subscription",
      line_items: [
        item,
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
      // automatic_tax: { enabled: true }
    });

    return res.redirect(303, session.url);
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      }
    });
  }
});

app.listen(3000, () => console.log("Node server listening on port 4242!"));