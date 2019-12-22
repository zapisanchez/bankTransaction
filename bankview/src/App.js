import React, { Component } from 'react';
import './App.css';

//Some UI components
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'

//System (REST) request
import axios from 'axios';

//Mine
import UserList from './UserList';
import UserHeader from './UserHeader';
import Settingicon from './SettingsIcon'
import Fun from './LetsFun'
import Transactor from './Transactor'



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

  isFunDay(){
    let day = new Date();
    return day.getDay() === 5 ? true : false;
  }

  render(){
    console.log("New Table")
    return (
                    
      <div id ='root' className='mainCo'>

      <div id='App-header'>
       <Settingicon />
        <Transactor users = {this.state.persons}
                    onPutDone={this.doGetPetition.bind(this)}/>
        {this.isFunDay()? <Fun/> : null}
      </div>
      <div id ='App-Table'>
        <Table basic='very' collapsing id='persons' className='fullTable'>
          <UserHeader users={this.state.persons}/>
          <UserList users={this.state.persons}/>
        </Table>
      </div>
      
      </div>
    )
   }
}




export default App;
