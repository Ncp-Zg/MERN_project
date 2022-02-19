const asyncHandler = require("express-async-handler");


const paymentController = asyncHandler(async (req, res) => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
    const total = req.query.total;
    console.log("payment request recieved >>>>",total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "try",
    });

    // OK - Created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
});

module.exports = {
  paymentController,
};
