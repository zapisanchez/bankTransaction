import React from 'react';
import { Header, Icon } from 'semantic-ui-react'

const HeaderSettingsIcon = () => (
  <Header as='h2' icon>
    <Icon name='settings' />
    Account Settings
    <Header.Subheader>
      Manage account settings.
    </Header.Subheader>
  </Header>
)

export default HeaderSettingsIcon