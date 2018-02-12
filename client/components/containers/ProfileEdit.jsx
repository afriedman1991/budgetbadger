import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Bank from './BankContainer.jsx';
import { App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, Card, TextInput, FormField } from 'grommet';

const UPDATE_USER = gql`
  mutation updateUser($email: String!, $first_name: String, $last_name: String, $city: String, $street: String, $zip_code: String, $state: String, $phone: String) {
    updateUser(email: $email, first_name: $first_name, last_name: $last_name, city: $city, street: $street, zip_code: $zip_code, state: $state, phone: $phone) {
      email
    }
  }
`

class ProfileEdit extends Component {
  constructor({userInfo}) {
    super({userInfo})
    this.state = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      street: userInfo.street,
      state: userInfo.state,
      zip_code: userInfo.zip_code,
      phone: userInfo.phone,
      email: userInfo.email,
      banks: userInfo.banks
    }
    
  }

  componentDidMount() {
    console.log('mounted');
  }

  render() {
    {console.log(this.props)}
    return (
      <Box full={true} align="center" pad="large" flex={true}>
        <Card label="User Info" alignSelf="center" style={{ height: "100%", width: "100%", outline: "#000 solid thin" }} >
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Box full={true} direction="row" align="center" pad={{ between: "small"}} margin="small" >
            <Box size={{ height: "medium", width: "large" }} style={{ display: "inline" }} direction="column" pad={{ between: "small" }} >
              <Card label="Name" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>                
                <Box pad={{ between: "small" }}>
                  <FormField>
                      <TextInput onDOMChange={e => this.setState({
                        first_name: e.target.value
                      })} defaultValue={this.state.first_name}/>
                      <TextInput onDOMChange={e => this.setState({
                        last_name: e.target.value
                      })} defaultValue={this.state.last_name}/>
                  </FormField>
                </Box>
              </Card>
              <Card label="Address" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>              
                <FormField>
                  <TextInput onDOMChange={e => this.setState({
                    street: e.target.value
                  })} defaultValue={this.state.street}/>
                  <TextInput onDOMChange={e => this.setState({
                    state: e.target.value
                  })} defaultValue={this.state.state}/>
                  <TextInput onDOMChange={e => this.setState({
                    zip_code: e.target.value
                  })} defaultValue={this.state.zip_code}/>
                </FormField>
              </Card>
              <Card label="Phone" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
                <TextInput onDOMChange={e => this.setState({
                  phone: e.target.value
                })} defaultValue={this.state.phone}/>
              </Card>
            </Box>
            <Card label="Accounts" size={{ height: "medium", width: "medium" }} style={{ display: "inline" }} colorIndex="light-2" margin={{ vertical: "small", horizontal: "small" }}>
              <Paragraph margin="small">
                <Bank banks={this.state.banks} />
              </Paragraph>
            </Card>
          </Box>
        </Card>
        <button onClick={() => {
          this.props.updateUserProfile({
            variables: {
              email: this.state.email,
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              street: this.state.street,
              zip_code:this.state.zip_code,
              state:this.state.state,
              phone:this.state.phone
            }
          }).then(({data}) => {
            console.log(data);
          })}
        }>Handle the changes</button>
      </Box>
    )
  }
}

export default compose(graphql(UPDATE_USER, {name: "updateUserProfile"})(ProfileEdit));