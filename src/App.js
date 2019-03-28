import React, { Component } from 'react';
import './App.css';

import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*
          <FaceRecognition />
        */}
      </div>
    );
  }
}

export default App;
