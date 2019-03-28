import React, { Component } from 'react';
import './App.css';

//Node packages
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'; 

//Components
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import FaceRecognition from './components/faceRecognition/faceRecognition';

const app = new Clarifai.App( {
  apiKey: '52d56e21bc684677955e8b09444dd647'
});

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

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  //event listeners receive events!
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {

    this.setState({imageUrl: this.state.input});

    app.models.predict(
      Clarifai.COLOR_MODEL, 
      this.state.input).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">

        <Particles className='particles' 
              params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onSubmit={this.onSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />

      </div>
    );
  }
}

export default App;

/*updated URL: "https://samples.clarifai.com/metro-north.jpg"  
API name: Clarifai.FACE_DETECT_MODEL*/
