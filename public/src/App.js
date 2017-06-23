import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import { Button, FormGroup, HelpBlock, ControlLabel, FormControl } from 'react-bootstrap';
import request from "superagent";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
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

  getAll() {
    request.get('/getall')
  }
}

export default App;
