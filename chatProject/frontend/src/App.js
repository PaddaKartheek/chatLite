import React, { Component } from 'react';
import {RegWithRouter} from './components/register'
import {LogWithRouter} from './components/login';
import {UserWithRouter} from './components/udash';
import {AdminWithRouter} from './components/adash'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


class App extends Component
{
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  render(){
    return (
      <Router>
        <div className='App'>
          <Routes>
              <Route path="/register" element={<RegWithRouter/>} />
              <Route path="/user" element={<UserWithRouter/>}/>
              <Route path="/admin" element={<AdminWithRouter/>}/>
              <Route path="/" element={<LogWithRouter/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
