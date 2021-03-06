import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    //Initialize firebase app
    this.app = app.initializeApp(config);

    // DB setup
    this.db = app.firestore();

    this.storage = app.storage().ref();

    this.db.settings({
      // Deprecated
      // timestampsInSnapshots: true
    });
     //Auth Setup
     this.auth = new app.auth();

     this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL)
     this.facebookProvider = new app.auth.FacebookAuthProvider();
     this.facebookProvider.addScope('email');
  }

  events = () => this.db.collection(`events`);
  businesses = ()  => this.db.collection(`businesses`)
  users = ()  => this.db.collection(`users`)

  transaction = (transaction) => this.db.runTransaction(transaction);

  ArrayUnion = (data) => new app.firestore.FieldValue.arrayUnion(data);
  ArrayRemove = (data) => new app.firestore.FieldValue.arrayRemove(data);
  Geopoint = (long,lat) => new app.firestore.GeoPoint(long, lat)

  // Check for previous login
  
  doSignInWithFacebook = async () => {
    return await this.auth.signInWithPopup(this.facebookProvider);
  }

  setUpUser = (user) => this.user = user;

  doSignOut = () => this.auth.signOut();

}

export default Firebase;