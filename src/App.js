import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';

const particlesOptions = {
  particles: {
    number: {
      value: 300,
      denisty: {
        enable: true,
        value_area: 400
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">

        <Particles className='particles' 
              params={particlesOptions}
        />
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
