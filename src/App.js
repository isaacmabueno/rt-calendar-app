import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component {
  constructor(props) {
    super(props);
    let currDate = new Date();
    this.state = { date: currDate };
  }
  
  render() {
    return (
      <div>
        <Calendar date={this.state.date} />
      </div>
    );
  }
}

export default App;