import React, { Component } from 'react';
import { Box, Button, Card, Columns, CheckBox, Form, FormFields, Footer, Header, Heading, Label, Paragraph, TextInput, Tiles } from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';

const { createApolloFetch } = require('apollo-fetch');
const fetch = createApolloFetch({
  uri: 'http://localhost:1337/graphql'
});

const CREATE_USER = gql`
  mutation createUser($user_email: String!, $password: String!) {
    createUser(email: $user_email, password: $password)
  }
`

class SplashSignUp extends Component {
  constructor() {
    super()
    this.state = {
      user_email: '',
      password: ''
    }
    // this._confirm = this._confirm.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  // async _confirm() {
  //   const { user_email, password } = this.state;
  //   try {
  //     const result = await this.props.mutate({
  //       variables: {
  //         user_email,
  //         password,
  //       }
  //     })
  //     // const token = result.data.createUser;
  //     // const cookie = new Cookies();
  //     // cookie.set('TOKEN', token);
  //   } catch(error) {
  //     console.log(error);
  //   }
  // }

  createUser() {
    fetch({
      query: CREATE_USER,
      variables: {
        user_email: this.state.user_email,
        password: this.state.password
      }
    }).then(res => console.log("RESPONSE CREATE USER:", res))
  }

  render() {
    return (
      <Box align="center" focusable={true} >
        <Card align="center" style={{ outline: "#000 solid thin" }}> 
          <h1 style={{ textAlign: "center" }} >Sign Up</h1>
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Form pad="small" style={{ width: "100%" }} >
                <Box pad={{ vertical: "small", width: "100%" }} >
                  <FormFields style={{ width: "100%" }} >
                      <Label>Email</Label>
                      <TextInput onDOMChange={e => this.setState({ user_email: e.target.value })}  style={{ width: "100%" }} name="userEmail" />
                      <Label>Password</Label>
                      <TextInput onDOMChange={e => this.setState({ password: e.target.value })} style={{ width: "100%" }} type="password" />
                  </FormFields>
                </Box>
                <Footer size="small" direction="column"
                  align={'center' ? 'stretch' : 'start'}
                  pad={{ vertical: "medium" }}>
                  <Button onClick={() => this.createUser} primary={true} fill="center" label='Create account' />
                </Footer>
              </Form>
        </Card>
      </Box>
    )
  }
}

export default SplashSignUp;