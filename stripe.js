const express = require("express");
const router = express.Router();

//Add stipre key
const Stripe_Key =
  "sk_test_51LbqqxD7XtsArBuMDCsw5YcHcOY53Ct8QdF5bM4ary2trHRisjZZQhemgAbaidGJRMpIcBhYjWeKuTXDrRoYK5Ry00FI4QT3Xj";
const stripe = require("stripe")(Stripe_Key);
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Stripe Hello World",
  });

  //create a new customer for stripe
  router.post("/newCustomer", async (req, res) => {
    console.log("\n\n Body Passed:", req.body);
    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
      });
      return res.status(200).send({
        // customerDetials: customer,
        customerId: customer.id,
        customerEamil: customer.email,
      });
    } catch (error) {
      return res.status(400).send({ Error: error.raw.message });
    }
  });
});
module.exports = router;
