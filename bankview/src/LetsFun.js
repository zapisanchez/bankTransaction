import React from 'react';
import { Modal, Button, Embed } from 'semantic-ui-react'

const Fun = () =>(
      <Modal size ='small' trigger={
        <Button id='JustAnotherButton'></Button>
      }>
      <Modal.Header>
        If you're here, maybe you 
        wanna listen best song ever
      </Modal.Header>
      <Modal.Content image>
      <Modal.Description>
        <Embed
        id='dQw4w9WgXcQ'
        source='youtube'
        autoplay={true}/>
      </Modal.Description>
      </Modal.Content>
      </Modal>
)

export default Fun