import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class UserHeader extends Component {

    getHeader(){
        if(this.props.users && this.props.users[0]){
      
          let header = Object.keys(this.props.users && this.props.users[0]);
          console.log ("the header: " + header)
        
          //as known as "the ñapa..."
          header[header.indexOf('walletList')] = 'hashId';
          header.push('Amount');
      
          return header.map((key, index) => {
            return (
                <Table.HeaderCell key={`header-${index}`}> 
                    {key.toUpperCase()}
                </Table.HeaderCell>
            )
          })
        }
      }

    render(){
        return(
        <Table.Header>
        <Table.Row>
            {this.getHeader()}
        </Table.Row>
        </Table.Header>
        )}
}

export default UserHeader;