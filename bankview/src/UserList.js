import React, { Component} from 'react';
import { Table } from 'semantic-ui-react'
import User from './User';

class UserList extends Component {

  render(){
    return (
      <Table.Body>
        {this.props.users.map(u => {

          return(
            <User 
              id={u.id}
              key={u.id}
              name={u.name}
              lastName={u.lastName}
              hash={u.walletList?.[0]?.hash}
              balance={u.walletList?.[0]?.balance}
              />
          );
        })}
      </Table.Body>
    );
  }

}

export default UserList;