import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import UserList from './UserList';
import UserHeader from './UserHeader';

import axios from 'axios';
import Settingicon from './SettingsIcon'
import Transactor from './Transactor'
import 'semantic-ui-css/semantic.min.css'

import { Table } from 'semantic-ui-react'


class App extends Component{
  state = {
    persons: []
  }

  doGetPetition(){

    axios.get(`http://localhost:8080/users`)
      .then(res => {
        const persons = res.data;
        console.log("Zapi:" + JSON.stringify(persons))
        this.setState({ persons });
      })

  }

  componentDidMount() {
    this.doGetPetition();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.doGetPetition();
    }
  }

  render(){
    console.log("New Table")
    return (
      <div id ='root' >
      <div id ='maindiv' className='mainCo'>
       <Settingicon/>
        <Table celled id='persons' className='mainCo'>
          <UserHeader users={this.state.persons}/>
          <UserList users={this.state.persons}/>
        </Table>

      </div>
        <Transactor users = {this.state.persons}
                    onPutDone={this.doGetPetition.bind(this)}/>
      </div>
    )
    

   }

}

export default App;
