import React, { Component } from 'react';
import UserSelector from './UserSelector';
import { Input, Button, Label, Message } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let options = {
  type: toast.TYPE.ERROR,
};
class Transactor extends Component {
  notify = info => toast(info, options);

  constructor(props) {
    super(props);

    this.state = {
      fromHash: 0,
      toHash: 0,
    };

    this.checkAndTransact = this.checkAndTransact.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.doGetPetition = this.doGetPetition.bind(this);
  }

  doGetPetition() {
    this.props.onPutDone();
  }

  updateFromHashSelected(fromHash) {
    this.setState(state => ({
      fromHash: fromHash,
    }));
  }

  updateToHashSelected(toHash) {
    this.setState(state => ({
      toHash: toHash,
    }));
  }

  checkAndTransact(event, data) {
    //Here is where magic happens

    //Best hack 4ever
    //http://shorturl.at/gipJY
    let that = this;

    // Send a POST request
    axios({
      method: 'post',
      url: `http://localhost:8080/move`,
      data: {
        from: parseInt(this.state.fromHash),
        to: parseInt(this.state.toHash),
        amount: parseFloat(this.state.inputValue),
      },
      params: {
        from: parseInt(this.state.fromHash),
        to: parseInt(this.state.toHash),
        amount: parseFloat(this.state.inputValue),
      },
    })
      .then(function(response) {
        if (response.status === 200) {
          //transactions correctly applied
          //Calling callback
          that.doGetPetition();
        }
      })
      .catch(function(error) {
        //Here we could make a good error handling,
        // Seeing what number os the post response
        // and giving to the user more info
        // Not enough money etc...
        //that.showModalResult();
        that.notify('Transaction Error! (Wallet has money?)');
      });
  }

  updateInputValue(event, data) {
    this.setState({ inputValue: data.value });
  }

  render() {
    return (
      <div id="transaction">
        <Message>
          <Message.Header>Make a Transaction</Message.Header>
          <p>Select 2 users to make a wallet transaction</p>
        </Message>
        <UserSelector
          users={this.props.users}
          callback={this.updateFromHashSelected.bind(this)}
        />
        <UserSelector
          users={this.props.users}
          callback={this.updateToHashSelected.bind(this)}
        />

        <Label>Select Budget</Label>
        <Input placeholder="Money..." onChange={this.updateInputValue} />
        <Button
          id="transButton"
          content="Transact!"
          color="google plus"
          onClick={this.checkAndTransact}
        />
        <ToastContainer position="top-center" />
      </div>
    );
  }
}
export default Transactor;
