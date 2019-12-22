import React, { Component} from 'react';
import { Select} from 'semantic-ui-react';


class UserSelector extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = 
        {};

        this.changeWallet = this.changeWallet.bind(this);
        this.updateActiveHash = this.updateActiveHash.bind(this);
      }

      hashUsed(hashUsed){
          this.props.callback(hashUsed)
      }


    changeWallet(event, data) {

        // - 1 Due list starts in 1
        let user = this.props.users[data.value - 1];
        let walletList = user.walletList;

        let enableSecond = user.walletList.length > 1? true : false;

        console.log("enable second: " + enableSecond )
        // console.log("WalletList: ")

        //When change a user selection,
        //have to update hashSelected
        //If user just have 1 wallet it's so easy
        if (!enableSecond)
        {
            this.setState({walletHash : walletList[0].hash})
            //console.log("valor de hash: " + walletList[0].hash)
            this.hashUsed(walletList[0].hash);
        }

        //Updating value state...
        this.setState(state =>({
            activeValue : walletList.map(u=> {return(
                {key :u.hash , value : u.hash , text: "Wallet: " + u.hash }
            )}),
            secondSelect : enableSecond
        }))
        
    }


    //If user has >1 wallet, when selected neew update
    // which wallet is in use
    updateActiveHash(event, data){

        console.log("Data: " + JSON.stringify(data));
        this.setState({walletHash : data.value});
        //notify parent
        this.hashUsed(data.value);
    }

    render(){
        return (
        <div>
          <Select placeholder='Choose and User ID' 
          onChange={this.changeWallet}
          options={this.props.users.map(u => {return ({key:u.id, value : u.id, text:u.id + " " + u.name})})}/>

        {this.state.secondSelect? 
           <Select placeholder='Select a Wallet' 
           options={this.state.activeValue}
           onChange={this.updateActiveHash}/>
          : null }

        </div>
        )
    }
    
}
export default UserSelector;