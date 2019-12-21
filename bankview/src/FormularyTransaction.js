import React, { Component} from 'react';
import { Form} from 'semantic-ui-react';
import UserSelector from './UserSelector';

class UserSelector extends Component {

    constructor(){
        super(props);
    }

    render(){
        return (
            <Form>



<Form.Group widths='equal'>
      <Form.Field
        id='form-input-control-first-name'
        control={UserSelector}
        label='Origin'
      />
      <Form.Field
        control={Select}
        options={genderOptions}
        label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
        placeholder='Gender'
        search
        searchInput={{ id: 'form-select-control-gender' }}
      />
    </Form.Group>
    
            </Form>
            )
    }
}
