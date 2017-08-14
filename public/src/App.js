import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import { Button, FormGroup, HelpBlock, ControlLabel, FormControl } from 'react-bootstrap';
import request from "superagent";
import jsonp from 'tiny-jsonp';
import { BrowserRouter as Router, Route, Switch } from 'react-router';

const gApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.getGoogleMaps();
    this.onLocation();
  }

  componentDidMount() {
    this.getAll(this);
  }

  onLocation() {
    var options = {
      enableHighAccuracy: true,
      timeout: 100000,
      maximumAge: 0
    };

    window.navigator.geolocation.watchPosition(function() {
      console.log("(*()((");
      console.log(arguments);
    }, function(){
      console.log("err" , arguments);
    }, options);
    window.navigator.geolocation.getCurrentPosition(function() {
      console.log("(*()((");
      console.log(arguments);
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  getGoogleMaps() {
    jsonp("https://maps.googleapis.com/maps/api/js")
      .query({
	key : gApiKey
      })
      .end(function() {
	var uluru = {lat: -25.363, lng: 131.044};
        var map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new window.google.maps.Marker({
          position: uluru,
          map: map
        });
	var ox = uluru.lat, oy = uluru.lng;
	var r = 3;
	var x = ox;
	var mox = ox + 2*r;
	var delta = r/100;
	setInterval(function() {
	  // Range ox to ox + r , calculate y
	  x = x + delta;
	  if (x >= mox) {
	    x = mox;
	    delta = delta * -1;
	  } else if (x <= ox) {
	    x = ox;
	    delta = delta * -1;
	  }
	  // Calculate y
	  var y = Math.sqrt(r * r - (x - (ox + r)) * (x - (ox+r)));
	  if (delta < 0)
	    y = oy - y;
	  else
	    y = oy + y;
	  marker.setPosition({ lat: x, lng: y});
	}, 10);
      });
  }

  render() {
    const k = (this.state.t || []).map((x) => <span>{x} , </span>);
    return (
      <div className="App">
	<h1> Signup Form </h1>
	<form onSubmit={this.onSubmit.bind(this)}>
	  <FormGroup controlId="formBasicText">
	    <ControlLabel>Working example with validation</ControlLabel>
	    <FormControl type="text" placeholder="Enter text" value={this.value} onChange={this.handleChange.bind(this)} />
	    <HelpBlock>Validation is based on string length.</HelpBlock>
	    <Button type='submit'>Save</Button>
	  </FormGroup>
	</form>
	<div>
	  {k}
	</div>
      </div>
    );
  }

  onSubmit(e) {
    console.log(this.input);
    request.post('/save')
      .send({ name: "" + this.state.value })
      .then(function() {
	alert("saved");
      })
      .catch(function(){
	alert("failed");
      });
    e.preventDefault();
  }

  getAll(self) {
    request.get('/getall').then(function(r) {
      console.log(r);
      self.setState({
	t: JSON.parse(r.text)
      });
    })
  }
}

export default App;
