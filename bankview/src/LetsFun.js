import React from 'react';
import Emoji from './Emoji';
import { Modal, Button, Embed } from 'semantic-ui-react';

const Fun = () => (
  <Modal size="small" trigger={<Button id="JustAnotherButton"></Button>}>
    <Modal.Header>
      {<Emoji symbol="🎉" />} If you're here, maybe you wanna listen best song
      ever
      {<Emoji symbol="🥳" />} {<Emoji symbol="🧑‍🎤" />}
    </Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Embed id="dQw4w9WgXcQ" source="youtube" autoplay={true} />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default Fun;
