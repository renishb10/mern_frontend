import React, { Component } from 'react';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Footer from './components/layouts/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
