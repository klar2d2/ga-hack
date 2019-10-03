//Import packages
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'


//REsources and custom components
import './App.css';
import Header from './nav/Header'
import Nav from './nav/Nav'
import Content from './content/Content'
import SERVER_URL from './constants'

class App extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    //Go Look for a Token
    this.getUser()
  }

  getUser = () => {
    //see if theres a token

    let token = localStorage.getItem('mernToken')
    console.log('get user callews')
    //If theres a token, try to use it ot get the user info
    if (token) {
      console.log('token waaas', token)
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: {'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log(response)
        this.setState({ user: response.data.user })
      })
      .catch(err => {
        console.log('Error with token', err)
      })
    }
    else {
      this.setState({ user: null })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav updateUser={this.getUser} user={this.state.user} />
          <Content updateUser={this.getUser} user={this.state.user} />
        </div>
      </Router>
    );
  }
}

export default App;
