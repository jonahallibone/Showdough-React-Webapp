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
const createProfile = (userRecord, context) => {
  const {email, displayName, photoURL, uid } = userRecord;

  return db
    .collection('users')
    .doc(uid)
    .set({ email, uid, displayName, disabled: false, photoURL, businessAccount: false })
    .catch(console.error);
};

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
};