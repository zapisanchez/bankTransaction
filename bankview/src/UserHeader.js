import React from 'react';
import { Table } from 'semantic-ui-react';

const UserHeader = props => {
  function getHeader(props) {
    if (props.users && props.users[0]) {
      let header = Object.keys(props.users && props.users[0]);

      //as known as "the ñapa..."
      header[header.indexOf('walletList')] = 'hashId';
      header.push('Amount');

      return header.map((key, index) => {
        return (
          <Table.HeaderCell key={`header-${index}`}>
            {key.toUpperCase()}
          </Table.HeaderCell>
        );
      });
    }
  }

  return (
    <Table.Header>
      <Table.Row>{getHeader(props)}</Table.Row>
    </Table.Header>
  );
};

export default UserHeader;
