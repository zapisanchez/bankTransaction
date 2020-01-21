import React, { useState } from 'react';
import { Select } from 'semantic-ui-react';

const UserSelector = props => {
  const [activeValue, setActiveValue] = useState(null);
  const [secondSelect, setEnableSecondSelect] = useState(false);

  function hashUsed(hashUsed) {
    props.callback(hashUsed);
  }

  function changeWallet(event, data) {
    // - 1 Due list starts in 1
    let user = props.users[data.value - 1];
    let walletList = user.walletList;

    let enableSecond = user.walletList.length > 1 ? true : false;

    //When change a user selection,
    //have to update hashSelected
    //If user just have 1 wallet it's very easy
    if (!enableSecond) {
      setActiveValue(walletList[0].hash);

      //console.log("Hash value: " + walletList[0].hash)
      hashUsed(walletList[0].hash);
    }

    //Updating value state...
    setActiveValue(
      walletList.map(u => {
        return {
          key: u.hash,
          value: u.hash,
          text: 'Wallet: ' + u.hash,
        };
      })
    );
    setEnableSecondSelect(enableSecond);
  }

  //If user has >1 wallet, when selected new update
  // which wallet is in use
  function updateActiveHash(event, data) {
    //notify parent
    hashUsed(data.value);
  }

  return (
    <div>
      <Select
        placeholder="Select an User"
        onChange={changeWallet}
        options={props.users.map(u => {
          return { key: u.id, value: u.id, text: u.id + ' ' + u.name };
        })}
      />

      {secondSelect ? (
        <Select
          placeholder="Select a Wallet"
          options={activeValue}
          onChange={updateActiveHash}
        />
      ) : null}
    </div>
  );
};

export default UserSelector;
