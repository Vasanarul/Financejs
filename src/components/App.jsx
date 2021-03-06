import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';
import Remove from './Remove.jsx';
import Userlist from './Userlist.jsx';

import Background from '../styles/background.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      info : []
    }

    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    console.log('mounted component')
    this.getUser()
  }

  getUser() {
    axios.get('/api/users')
    .then (
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          info: result.data
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const {error, isLoaded, info} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
    return (
    <div>
      <Background>
      <Userlist users={this.state.info}/>
      <br></br>
      <br></br>
      <Form />
      <br></br>
      <Remove />
      </Background>
    </div>
      )
    }
  }
}

export default App;