import React, { Component } from 'react';
import LoginBar from '../pages/LoginBar.jsx';
import Main from '../pages/Main.jsx';
import Profile from '../containers/Profile.jsx';
import {App, Tab, Tabs, Paragraph, Footer, Title, Box, Menu, Anchor} from 'grommet';
import { Route } from 'react-router-dom';
import styles from '../../../public/main/jStyles';
import Cookies from 'universal-cookie'

export default class extends Component {
  componentWillMount() {
    const id = new Cookies().get('user').user_id
    window.localStorage.setItem('user_id', id)
  }
  render() {
    return (
      <div>
        <App centered={false}>
          <LoginBar/>
          <Route path='/' component={Main} />
          <Route path='/profile' component={Profile} />
          <Footer justify='between'size='large'>
            <Title>
              <s />
              <img src="https://visualpharm.com/assets/2/Badger-595b40b75ba036ed117d8786.svg" style={styles.footerImage}/>
              Budget Badger
            </Title>
            <Box direction='row'
              align='center'
              pad={{"between": "medium"}}>
              <Paragraph margin='none'>
                © 2018 Priam Labs
              </Paragraph>
              <Menu direction='row'
                size='small'
                dropAlign={{"right": "right"}}
                pad={{"between": "medium"}}>
                <Anchor href='#'>
                  Support
                </Anchor>
                <Anchor href='#'>
                  Contact
                </Anchor>
                <Anchor href='#'>
                  About
                </Anchor>
                <s />
              </Menu>
            </Box>
          </Footer>
        </App>
      </div>
    )
  }
} 