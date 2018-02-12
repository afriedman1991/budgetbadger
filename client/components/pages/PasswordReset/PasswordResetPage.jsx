import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Box, Button, Card, Columns, CheckBox, Form, FormFields, Footer, Header, Heading, Label, Paragraph, TextInput, Tiles, Layer, PasswordInput } from 'grommet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class PasswordResetPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      newPassword: '',
      passwordCopy: '',
      passwordsMatch: false,
      layerActive: false,
      match: '',
      location: '',
      history: ''
    }
    this.submitPassword = this.submitPassword.bind(this);
    this.triggerLayer = this.triggerLayer.bind(this);
    this.writePassToState = this.writePassToState.bind(this);
    this.writeCopyToState = this.writeCopyToState.bind(this);
  }

  componentDidMount() {
    console.log('MATCH LOCATION AND HISTORY FROM PASSWORD RESET PAGE!!!!', this.state.match, this.state.location, this.state.history);
  }

  submitPassword() {
    let password = this.state.newPassword;
    let confirm = this.state.passwordCopy;
    console.log("PASSWORDS:", password + ' ', confirm);
    if (password !== confirm) { 
      this.triggerLayer();
    } else {
      this.props.mutate({
        variables: { password: this.state.newPassword, email: this.state.userEmail }
      })
    }
  }

  triggerLayer() {
    this.setState({
      layerActive: !this.state.layerActive
    })
  }

  writePassToState(e) {
    this.setState({
      newPassword: e.target.value
    })
  }

  writeCopyToState(e) {
    this.setState({
      passwordCopy: e.target.value
    })
  }

  render() {
    const layer = this.state.layerActive ? <Layer closer={true} flush={true} onClose={this.triggerLayer}>
      <Box full={false} align="center" pad="medium" size={{ height: "small", width: "small" }}>
        <Box full={false} alignSelf="center" margin={{ top: "medium" }} textAlign="center" >
          <Paragraph margin="none">Your passwords don't match.</Paragraph>
          <Paragraph margin="none">Try re-entering them again.</Paragraph>
        </Box>
      </Box>
      </Layer> : null;
      const { match } = this.props;
    return (
      <Box full={false} alignSelf="center" pad="small" size={{ height: "large", width: "large" }} pad="medium">
        {layer}
        <div>You are now at {location.pathname}</div>
        <Paragraph align="center">Please enter your password in the form below, then re-enter it again in the second form to make sure you entered the correct password.</Paragraph>
        <Box margin={{ vertical: "small" }}>
          <PasswordInput onChange={this.writePassToState} />
        </Box>
        <Box margin={{ vertical: "small" }}>
          <PasswordInput onChange={this.writeCopyToState} />
        </Box>
        <Box margin={{ vertical: "small" }}>
          <TextInput onDOMChange={e => this.setState({ userEmail: e.target.value })} />
        </Box>
        <Box size={{ height: "10%", width: "15%" }} alignSelf="center" margin={{ top: "medium" }} >
          <Button label='Submit'
            href='#'
            primary={false}
            secondary={false}
            accent={false}
            critical={false}
            plain={false}
            onClick={this.submitPassword} />
        </Box>
      </Box>
    )
  }
}

const UPDATE_PASSWORD = gql`
  mutation UPDATE_PASSWORD($email: String!, $password: String!) {
    updatePassword(email: $email, password: $password)
  }
`

export default graphql(UPDATE_PASSWORD)(PasswordResetPage);