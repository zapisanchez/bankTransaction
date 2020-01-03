import React, { Component } from 'react';
import { Select } from 'semantic-ui-react';

class UserSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.changeWallet = this.changeWallet.bind(this);
    this.updateActiveHash = this.updateActiveHash.bind(this);
  }

  hashUsed(hashUsed) {
    this.props.callback(hashUsed);
  }

  changeWallet(event, data) {
    // - 1 Due list starts in 1
    let user = this.props.users[data.value - 1];
    let walletList = user.walletList;

    let enableSecond = user.walletList.length > 1 ? true : false;

    //When change a user selection,
    //have to update hashSelected
    //If user just have 1 wallet it's very easy
    if (!enableSecond) {
      this.setState({ walletHash: walletList[0].hash });
      //console.log("Hash value: " + walletList[0].hash)
      this.hashUsed(walletList[0].hash);
    }

    //Updating value state...
    this.setState(state => ({
      activeValue: walletList.map(u => {
        return { key: u.hash, value: u.hash, text: 'Wallet: ' + u.hash };
      }),
      secondSelect: enableSecond,
    }));
  }

  //If user has >1 wallet, when selected new update
  // which wallet is in use
  updateActiveHash(event, data) {
    this.setState({ walletHash: data.value });
    //notify parent
    this.hashUsed(data.value);
  }

  render() {
    return (
      <div>
        <Select
          placeholder="Select an User"
          onChange={this.changeWallet}
          options={this.props.users.map(u => {
            return { key: u.id, value: u.id, text: u.id + ' ' + u.name };
          })}
        />

        {this.state.secondSelect ? (
          <Select
            placeholder="Select a Wallet"
            options={this.state.activeValue}
            onChange={this.updateActiveHash}
          />
        ) : null}
      </div>
    );
  }
}
export default UserSelector;
