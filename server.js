var express = require("express");
var exphbs = require("express-handlebars");

var router = express.Router();
var db = require("./models");
const path = require("path");
const bodyParser = require("body-parser");
const sendMail = require("./public/js/mail");

const nodemailer = require("nodemailer");

require('dotenv').config();

var app = express();
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./routes/home-route.js");
var aboutRoutes = require("./routes/about-route.js");
var contactRoutes = require("./routes/contact-route.js");
var loginRoutes = require("./routes/login-route.js");
var adminregroute = require("./routes/registeradmin-route.js");
var signuproute = require("./routes/signup-route.js");
var listpet = require("./routes/registerpet-route.js");
var logadminroute = require("./routes/loginadmin-route.js");
var donateStart = require("./routes/donate-route.js");

// Sets up the Express app to handle data parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({
  extended: true
}));
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
app.use(express.json());

// Static directory
app.use(express.static("public"));
// Static folder ----needed for contact submit
// app.use(express.static(path.join(__dirname, "public")));
// app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use(passport.session());


// NOTE: THE BELOW CODE IS ONLY FOR OUR REFERENCE TO GET STARTED
// Routes
// TODO - Modify routes as we work along
// =============================================================

app.use(routes);
app.use(aboutRoutes, router);
app.use(contactRoutes, router);
app.use(loginRoutes, router);
app.use(adminregroute);
app.use(signuproute);
app.use(listpet);
app.use(logadminroute);

app.get('/donateStart', function (req, res) {
  res.render('donateStart');
});

app.get('/donation', function (req, res) {
  res.render('donation');
});

app.get('/card', function (req, res) {
  res.render('card');
});

app.get('/thanks', async (req, ) => {
  res.render('thanks');
});

app.post('/form', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const amount = req.body.amount;

  if (!amount) {
    // Data is valid!
    try {
      // Create a PI:
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // In cents
        currency: 'usd',
        receipt_email: email,
      });
      res.send({
        success: true
      });
      res.render('card', {
        name: name,
        amount: amount,
        intentSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      console.log('Error! ', err.message);
    }
  } else {
    res.send({
      success: false
    });
    // res.render('error', { title: 'Donate', errors: 'something went wrong' });
  }
});

// app.get("/contact", (req, res) => {
//   res.render("contactuspage");
// });

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});