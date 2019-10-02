const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require("stripe")("sk_test_QWjyLdk7UxrMIKowBeIN5IY600qk041iNB");
const cors = require('cors')({origin: true});

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = async (userRecord, context) => {
  const {email, displayName, photoURL, uid } = userRecord;

  const stripe_customer = await stripe.customers.create({
    description: `Showdough customer for ${displayName} with email ${email}`,
    email: email,
    name: displayName
  });

  return db
    .collection('users')
    .doc(uid)
    .set({ email, uid, displayName, stripe_customer: stripe_customer.id, disabled: false, photoURL, businessAccount: false })
    .catch(console.error);
};

const createCard = async (req, res) => {
  return cors(req, res, async () => {
    console.log(req);
    try {
      const card = await stripe.customers.createSource(
        req.body.user.stripe_customer,
        {
          source: req.body.stripe_token.id,
        }
      );
      await db.collection("users").doc(req.body.user.uid).update({card: card})
      res.json(card);
    } catch(err) {
      res.send(err);
    }
  });
}

const instantPayout = async (req, res) => {
  return cors(req, res, async () => {
    try {
      const payout = await stripe.payouts.create(
        {
          amount: 1000,
          currency: 'usd',
          method: 'instant',
        },
        {stripe_account: CONNECTED_STRIPE_ACCOUNT_ID}
      );

      res.json({message: `Success ${JSON.stringify(payout)}`});
    } catch(err) {
      res.send(err).end();
    }
  });
}

const createPayment = async (req, res) => {
  return cors(req, res, async () => {
    const stripe_token = 
      req.body && req.body.stripe_token
      ? req.body.stripe_token
      : 'Error!';

  try {
    let {status} = await stripe.charges.create({
      amount: 300,
      currency: "usd",
      description: "Showdough Event Purchase",
      source: stripe_token
    });

      res.json({message: "Success"});
    } catch (err) {
      res.send(err).end();
    }
  });
}

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  createPayment: functions.https.onRequest(createPayment),
  instantPayout: functions.https.onRequest(instantPayout),
  createCard: functions.https.onRequest(createCard)
};