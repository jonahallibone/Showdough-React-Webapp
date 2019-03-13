import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {geolocated} from 'react-geolocated';

import Firebase, { FirebaseContext } from './components/Firebase';
import Layout from "./components/Layout/Layout";

import './App.css';

const firebase = new Firebase()
class App extends Component {
  constructor(props) {
    super(props);

    this.setUser = (user) => {
      this.setState(state => ({
          user: user,
      }))
    }


    this.state = {
      firebase: firebase,
      setUser: this.setUser,
      location: null
    }

  }

  getLocation() {
    return navigator.geolocation.getCurrentPosition(position => {
      
      if(position) {
        this.setState({location: position})
      }

    });
  }

  componentDidMount() {
    this.getLocation();
    firebase.auth.onAuthStateChanged(user => {
        if (user) {
          this.setState({user: user});
        }

        else this.setState({user: undefined});
      });
  }

  render() {
    return (
      <div className="App">
        {/* {this.props.coords.latitude} */}
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
