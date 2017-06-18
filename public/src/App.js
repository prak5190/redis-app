import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import { Button, FormGroup, HelpBlock, ControlLabel, FormControl } from 'react-bootstrap';
import request from "superagent";

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1> Signup Form </h1>
      <form onSubmit={this.onSubmit}>
      <FormGroup controlId="formBasicText">
      <ControlLabel>Working example with validation</ControlLabel>
      <FormControl type="text" placeholder="Enter text" />
      <FormControl.Feedback />
      <HelpBlock>Validation is based on string length.</HelpBlock>
      <Button type='submit'>Save</Button>
      </FormGroup>
      </form>
      </div>
    );
  }

  onSubmit(e) {
    request.post('/save')
	   .send({ name: "save" })
	   .then(function() {
	     alert("saved");
	   })
	   .catch(function(){
	     alert("failed");
	   });
    e.preventDefault();
  }
}

export default App;
