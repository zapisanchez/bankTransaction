import React, { Component } from 'react';
import { Table, Label, Image, Modal, Header } from 'semantic-ui-react';

import rickImg from './resources/rick-front.png';
import abraImg from './resources/abradolf-front.png';
import birdImg from './resources/bird-front.png';
import penImg from './resources/pencil-front.png';
import pooImg from './resources/poopy-front.png';
import defImg from './resources/default-avatar.png';

class User extends Component {
  getImageByName(name) {
    let imagePath;

    switch (name) {
      case 'Rick':
        imagePath = rickImg;

        break;
      case 'Bird':
        imagePath = birdImg;

        break;
      case 'Abradolf':
        imagePath = abraImg;
        break;
      case 'Pencil':
        imagePath = penImg;
        break;
      case 'Poopy':
        imagePath = pooImg;
        break;
      default:
        imagePath = defImg;
        break;
    }

    return imagePath;
  }

  //This should be in the server side, in User...
  getDescriptionByName(name) {
    let header;
    let mainText;
    let subText;

    switch (name) {
      case 'Rick':
        header = 'Scientific';
        mainText = `Genius scientist whose alcoholism 
                and reckless, nihilistic behavior are a 
                source of concern for his daughter's family, 
                as well as the safety of their son, Morty.`;
        subText = 'Earth, C-137 Dimension';
        break;

      case 'Bird':
        header = 'Human Bird';
        mainText = `Old friend of Rick's and has seemingly 
                known Morty since he was a baby.`;
        subText = 'Aka Phoenixperson';
        break;

      case 'Abradolf':
        header = 'Experiment';
        mainText = `He was created when Rick combined the DNA 
                of Abraham Lincoln and Adolf Hitler, 
                in an attempt to create a morally neutral super leader. 
                He failed and the end result was a cognitively 
                dissonant and morally-confused emotional trainwreck`;
        subText = 'Prepare to be emancipated from your own inferior genes!';
        break;

      case 'Pencil':
        header = 'Alien';
        mainText = `Anthropomorphic pencil who is 
                apparently great lifelong friends 
                with Rick Sanchez and Morty Smith`;
        subText = '';
        break;

      case 'Poopy':
        header = 'Refuge';
        mainText = `Very good friend to the Smith Family, from another dimension `;
        subText = 'Oo-wee!';
        break;

      default:
        header = 'A normal guy';
        mainText = `Some with money in my bank`;
        subText = '';
        break;
    }

    return [header, mainText, subText];
  }

  getModalDescription(name) {
    let [header, mainText, subtext] = this.getDescriptionByName(name);

    return (
      <Modal.Description>
        <Header>{header}</Header>
        <p>{mainText}</p>
        <p>{subtext}</p>
      </Modal.Description>
    );
  }

  /**
   * This one way of show all wallets of the user
   * duplicating each row
   *  | ID | NAME | HashID | Account
   *    1    Tony    288      2.3€
   *    1    Tony    321      20.3€
   * I know will have better way of doing this thing
   * But at this moment, i don't remember others
   */

  render() {
    //console.log("Valor de User: " + JSON.stringify(this.props));
    return this.props.walletList?.map((key, index) => {
      return (
        <Table.Row key={`row-${key.hash}-${index}`}>
          <Table.Cell>{this.props.id}</Table.Cell>
          <Table.Cell>
            <Modal
              trigger={
                <Label as="a">
                  <Image
                    avatar
                    spaced="right"
                    src={this.getImageByName(this.props.name)}
                  />
                  {this.props.name}
                </Label>
              }
            >
              <Modal.Header>
                {this.props.name} {this.props.lastName}
              </Modal.Header>
              <Modal.Content image>
                <Image
                  wrapped
                  size="small"
                  src={this.getImageByName(this.props.name)}
                />
                {this.getModalDescription(this.props.name)}
              </Modal.Content>
            </Modal>
          </Table.Cell>
          <Table.Cell>{this.props.lastName}</Table.Cell>
          <Table.Cell key={`hashCell-${key.hash}-${index}`}>
            {key.hash}
          </Table.Cell>
          <Table.Cell
            className="MoneyCell"
            textAlign="right"
            key={`moneyCell-${key.hash}-${index}`}
          >
            {key.balance} €
          </Table.Cell>
        </Table.Row>
      );
    });
  }
}

export default User;
