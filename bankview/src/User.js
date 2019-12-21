import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class User extends Component {

    render() {
        
        //console.log("Valor de User: " + JSON.stringify(this.props));

        return (
        
        <Table.Row>
            <Table.Cell>{this.props.id}</Table.Cell>
            <Table.Cell>{this.props.name}</Table.Cell>
            <Table.Cell>{this.props.lastName}</Table.Cell>
            <Table.Cell>{this.props.hash}</Table.Cell>
            <Table.Cell>{this.props.balance}</Table.Cell>
        </Table.Row>

    )
}
}


export default User;


