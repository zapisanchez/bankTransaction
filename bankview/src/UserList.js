import React from 'react';
import { Table } from 'semantic-ui-react';
import User from './User';

//function UserList(props){}
const UserList = props => {
  return (
    <Table.Body>
      {props.users &&
        props.users.map(u => {
          return (
            <User
              id={u.id}
              key={u.id}
              name={u.name}
              lastName={u.lastName}
              hash={u.walletList?.[0]?.hash}
              balance={u.walletList?.[0]?.balance}
              walletList={u.walletList}
            />
          );
        })}
    </Table.Body>
  );
};

export default UserList;
