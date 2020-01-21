import React, { useState } from 'react';
import UserSelector from './UserSelector';
import { Input, Button, Label, Message } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let options = {
  type: toast.TYPE.ERROR,
};

const Transactor = props => {
  const notify = info => toast(info, options);

  const [fromHash, setFromHash] = useState(0);
  const [toHash, setToHash] = useState(0);
  const [inputValue, setInputValue] = useState(null);

  function doGetPetition() {
    props.onPutDone();
  }

  function updateInputValue(event, data) {
    setInputValue(data.value);
  }

  function checkAndTransact(event, data) {
    //Here is where magic happens

    // Send a POST request
    axios({
      method: 'post',
      url: `http://localhost:8080/move`,
      data: {
        from: parseInt(fromHash),
        to: parseInt(toHash),
        amount: parseFloat(inputValue),
      },
      params: {
        from: parseInt(fromHash),
        to: parseInt(toHash),
        amount: parseFloat(inputValue),
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          //transactions correctly applied
          //Calling callback
          doGetPetition();
        }
      })
      .catch(function(error) {
        //Here we could make a good error handling,
        // Seeing what number os the post response
        // and giving to the user more info
        // Not enough money etc...
        //that.showModalResult();
        notify('Transaction Error! (Wallet has money?)');
      });
  }
  return (
    <div id="transaction">
      <Message>
        <Message.Header>Make a Transaction</Message.Header>
        <p>Select 2 users to make a wallet transaction</p>
      </Message>
      <UserSelector users={props.users} callback={setFromHash} />
      <UserSelector users={props.users} callback={setToHash} />

      <Label>Select Budget</Label>
      <Input placeholder="Money..." onChange={updateInputValue} />
      <Button
        id="transButton"
        content="Transact!"
        color="google plus"
        onClick={checkAndTransact}
      />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Transactor;
