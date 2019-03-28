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
import SignIn from './components/signIn/signIn';

const app = new Clarifai.App( {
  apiKey: '52d56e21bc684677955e8b09444dd647'
});

const particlesOptions = {
  particles: {
    number: {
      value: 200,
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
      box: {},
      route: 'signIn'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFaceBox.left_col * width,
      topRow: clarifaiFaceBox.top_row * height,
      rightCol: width - (clarifaiFaceBox.right_col * width),
      bottomRow: height - (clarifaiFaceBox.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  //event listeners receive events!
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">

        <Particles className='particles' 
              params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} />
        { this.state.route === 'signIn' 
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        }
      </div>
    );
  }
}

export default App;

/*updated URL: "https://samples.clarifai.com/metro-north.jpg"  
API name: Clarifai.FACE_DETECT_MODEL*/
