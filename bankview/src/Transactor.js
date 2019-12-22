import React, { Component} from 'react';
import UserSelector from './UserSelector'
import { Input, Button, Label, Message } from 'semantic-ui-react'
import axios from 'axios';

class Transactor extends Component {

    constructor(props) {
        super(props);

        this.state = 
        {
            fromHash : 0,
            toHash  : 0
        }

        this.checkAndTransact = this.checkAndTransact.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.doGetPetition = this.doGetPetition.bind(this);
    }

    doGetPetition(){
        this.props.onPutDone();
    }


    updateFromHashSelected(fromHash)
    {
        console.log("Hash FROM :" + fromHash)
        this.setState(state =>({
            fromHash : fromHash,
        }))
    }

    updateToHashSelected(toHash)
    {
        console.log("Hash TO :" + toHash)
        this.setState(state =>({
            toHash : toHash,
        }))
    }

    checkAndTransact(event, data){

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
            amount: parseFloat(this.state.inputValue)
        },
        params : 
            {from: parseInt(this.state.fromHash),
            to: parseInt(this.state.toHash),
            amount: parseFloat(this.state.inputValue)}
        })
        .then(function (response) {
            console.log(response);

            if (response.status === 200){
                //transactions correctly applied
                //Calling callback
                that.doGetPetition();
                
            }
          })
          .catch(function (error) {
            console.log(error);
          });
     }

    updateInputValue(event, data){
        this.setState({inputValue : data.value});
    }

    render() {
        return (
        <div id='transaction'>
            <Message>
            <Message.Header>Make a Transaction</Message.Header>
            <p>
              Select 2 users to make a wallet transaction
            </p>
            </Message>
            <UserSelector 
                users={this.props.users}
                callback={this.updateFromHashSelected.bind(this)} />
            <UserSelector 
                users={this.props.users} 
                callback={this.updateToHashSelected.bind(this)}/>
            
            <Label >Select Budget</Label>
            <Input placeholder='Money...'
                    onChange={this.updateInputValue} />
            <Button
                content='Transact!'
                color='google plus'
                onClick={this.checkAndTransact}
                 />
        </div>
        )
    }
}
export default Transactor;