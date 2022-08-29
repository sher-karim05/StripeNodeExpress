const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

var Publishable_Key =
  "pk_test_51LbqqxD7XtsArBuMMOHh3br04itBCZJrrnA4AczTmMoUzMNRYOafxdeBmO7g3qKdaSRft4FY6HiKKQiqyCRcRgYj00HE6hlnDX";
let Secret_Key =
  "sk_test_51LbqqxD7XtsArBuMDCsw5YcHcOY53Ct8QdF5bM4ary2trHRisjZZQhemgAbaidGJRMpIcBhYjWeKuTXDrRoYK5Ry00FI4QT3Xj";

const stripe = require("stripe")(Secret_Key);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//View engine setup
app.use(express.static("src/view"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("Home", {
    key: Publishable_Key,
  });
});

app.post("/payment", (req, res) => {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "sher karim",
      address: {
        street: "T34, Naveed Shaheed Road Jutial Gilgit.",
        postal_code: "5200",
        city: "gilgit",
        state: "GB",
        countary: "pakistan",
      },
    })
    .then((customer) => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server created Successfully");
});
