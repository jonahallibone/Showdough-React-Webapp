import React, { Component } from 'react';
import  { FirebaseContext } from './components/Firebase';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FirebaseContext.Consumer>
          {firebase => {
            return <div>I've access to Firebase and render something.</div>;
          }}
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

export default App;
