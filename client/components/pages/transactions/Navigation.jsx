import React from 'react'
import SideBar from 'grommet/components/Sidebar'
import { Box, Anchor, Menu, Header, Title } from 'grommet';

const Navigation = ({ accounts, filter }) => (
    <SideBar size="small">
      <Header><Title>Types</Title></Header>
      <Box flex='grow' justify='start'>
        <Menu primary={true}>
          <Anchor onClick={(e) => filter(e, 'all')}>
            Debit & Credit
          </Anchor>
          <Anchor onClick={(e) => filter(e, 'type')}>
            Debit
          </Anchor>
          <Anchor onClick={(e) => filter(e, 'type')}>
            Credit
          </Anchor>
        </Menu>
      <Header><Title>Accounts</Title></Header>
        <Menu primary={true}>
        {
          accounts ?
          accounts.map(account => (
            <Anchor onClick={(e) => filter(e, 'bank_name')}>
              {account.bank_name}
            </Anchor>
          )):
          null
        }
        </Menu>
      </Box>
    </SideBar>
)

export default Navigation;