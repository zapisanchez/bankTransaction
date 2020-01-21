import React, { useState, useEffect } from 'react';
import './App.css';

//Some UI components
import 'semantic-ui-css/semantic.min.css';
import { Table } from 'semantic-ui-react';

//System (REST) request
import axios from 'axios';

import UserList from './UserList';
import UserHeader from './UserHeader';
import Settingicon from './SettingsIcon';
import Fun from './LetsFun';
import Transactor from './Transactor';

const App = () => {
  const [persons, setPersons] = useState([]);

  function doGetPetition() {
    axios.get(`http://localhost:8080/users`).then(res => {
      const persons = res.data;
      setPersons(persons);
    });
  }

  useEffect(() => {
    //Get Petition
    axios.get(`http://localhost:8080/users`).then(res => {
      setPersons(res.data);
    });
  }, []);

  function isFunDay() {
    let day = new Date();
    return day.getDay() === 5 ? true : false;
  }

  return (
    <div id="root" className="mainCo">
      <div id="App-header">
        <Settingicon />
        <Transactor users={persons} onPutDone={doGetPetition} />
        {isFunDay() ? <Fun /> : null}
      </div>
      <div id="App-Table">
        <Table basic="very" collapsing id="persons" className="fullTable">
          <UserHeader users={persons} />
          <UserList users={persons} />
        </Table>
      </div>
    </div>
  );
};

export default App;
