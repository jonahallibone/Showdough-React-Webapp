import app from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/auth'; //Do later

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
    console.log(app.initializeApp(config));

    // DB setup
    this.db = app.firestore();

    this.db.settings({
      timestampsInSnapshots: true
    });
    // Add Google Login here
    // this.auth = app.auth();

  }

  complaints = () => this.db.collection(`complaints`);
}

export default Firebase;