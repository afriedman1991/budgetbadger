import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Anchor, Box, Button, Card, Columns, CheckBox, Form, FormFields, Footer, Header, Heading, Label, Paragraph, TextInput, Tiles, Layer, PasswordInput } from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';
import PasswordRecoveryModal from './PasswordReset/PasswordRecoveryModal.jsx';
import SplashSignUp from './SplashSignUp.jsx';

class SplashSignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_email: '',
      password: '',
      layerActive: false
    }
    this._confirm = this._confirm.bind(this)
  }

  async _confirm() {
    const { user_email, password } = this.state;
    try {
      const result = await this.props.mutate({
        variables: {
          user_email,
          password,
        }
      })
      const user = {
        user_id: result.data.loginUser[1],
        token: result.data.loginUser[0]
      }
      const cookie = new Cookies();
      cookie.set('user', user, {path:'/'});
      window.location.reload()
    } catch(error) {
        console.log(error)
    }
  }

  render() {
    return (
      <Box align="center" focusable={true}>
        <Card align="center" style={{ outline: "#000 solid thin" }}> 
              <h3 style={{ textAlign: "center" }} >Everything you could ever want in an accountant, and more</h3>
            <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Form pad="small" style={{ width: "100%" }} >
            <Box pad={{ vertical: "small", width: "100%" }} >
              <FormFields style={{ width: "100%" }} >
                  <Label>Email</Label>
                  <TextInput onDOMChange={e => this.setState({ user_email: e.target.value })} style={{ width: "100%" }} name="userEmail" />
                  <Label>Password</Label>
                  <PasswordInput onChange={e => this.setState({ password: e.target.value }) } style={{ width: "100%" }} />
              </FormFields>
            </Box>
            <CheckBox label="Remember me" pad="medium" />
            <Footer size="small" direction="column"
              align={'center' ? 'stretch' : 'start'}
              pad={{ vertical: "medium" }}>
              <Button onClick={() => this._confirm()} primary={true} fill="center" label='Sign In'/>
            </Footer>
          </Form>
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Paragraph align="center" size="small" margin="small" >
            <Link to={'/PasswordRecovery'}>
              <a style={{ color: "#000" }} class="grommetux-anchor">I forgot my password</a>
            </Link>
          </Paragraph>
          <Router>
            <Paragraph align="center" size="small" margin="small" >
              New to Budget Badger?
              <Link to={'/SplashSignUp'}>
                <a style={{ color: " #0000EE" }} class="grommetux-anchor"> Create an account.</a>
              </Link>
            </Paragraph>
          </Router>
        </Card>
      </Box>
    )
  }
}

const LOGIN_USER = gql`
  mutation LOGIN($user_email: String!, $password: String!) {
      loginUser(email: $user_email, password: $password)
  }
`

export default compose(graphql(LOGIN_USER))(SplashSignIn);