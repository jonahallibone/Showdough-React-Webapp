import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Firebase, { FirebaseContext } from './components/Firebase';
import Layout from "./components/Layout/Layout";

import './App.css';

const firebase = new Firebase()
class App extends Component {
  constructor(props) {
    super(props);

    this.setUser = (user) => {
      this.setState(state => ({
          user: user
      }))
    }


    this.state = {
      firebase: firebase,
      user: {},
      setUser: this.setUser
    }

  }

  componentWillMount() {
    firebase.auth.onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          this.setState({user: user});
        }
     });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <FirebaseContext.Provider value={this.state}>
            <Layout/>
          </FirebaseContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
