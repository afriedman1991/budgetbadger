import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Bank from './BankContainer.jsx';
import { App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, Card, TextInput, FormField } from 'grommet';

class ProfileEdit extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Box full={true} align="center" pad="large" flex={true}>
        <Card label="User Info" alignSelf="center" style={{ height: "100%", width: "100%", outline: "#000 solid thin" }} >
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Box full={true} direction="row" align="center" pad={{ between: "small"}} margin="small" >
            <Box size={{ height: "medium", width: "large" }} style={{ display: "inline" }} direction="column" pad={{ between: "small" }} >
              <Card label="Name" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>                
                <Box pad={{ between: "small" }}>
                  <FormField>
                      <TextInput onDOMChange={(e) => this.props.handleForm(e)} name="first_name" defaultValue={this.props.first_name}/>
                      <TextInput onDOMChange={(e) => this.props.handleForm(e)} name="last_name" defaultValue={this.props.last_name}/>
                  </FormField>
                </Box>
              </Card>
              <Card label="Address" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>              
                <FormField>
                  <TextInput onDOMChange={(e) => this.props.handleForm(e)} name="street" defaultValue={this.props.street}/>
                  <TextInput onDOMChange={(e) => this.props.handleForm(e)} name="state" defaultValue={this.props.state}/>
                  <TextInput onDOMChange={(e) => this.props.handleForm(e)} name="zip_code" defaultValue={this.props.zip_code}/>
                </FormField>
              </Card>
              <Card label="Phone" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
                <TextInput onDOMChange={(e) => this.props.handleForm(e)} name="phone" defaultValue={this.props.phone}/>
              </Card>
            </Box>
            <Card label="Accounts" size={{ height: "medium", width: "medium" }} style={{ display: "inline" }} colorIndex="light-2" margin={{ vertical: "small", horizontal: "small" }}>
            </Card>
          </Box>
        </Card>
        <button 
        onClick={(e) => this.props.handleSubmit(e)}
        >Handle the changes</button>
      </Box>
    )
  }
}

export default ProfileEdit;