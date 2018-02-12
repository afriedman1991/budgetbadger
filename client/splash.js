import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Splash from './components/pages/Splash.jsx';
import SplashSignIn from './components/pages/SplashSignIn.jsx';
import SplashSignUp from './components/pages/SplashSignUp.jsx';
import { App, Header, Box } from 'grommet';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import PasswordRecoveryModal from './components/pages/PasswordReset/PasswordRecoveryModal.jsx';
import PasswordResetPage from './components/pages/PasswordReset/PasswordResetPage.jsx';

const httpLink = new HttpLink();

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

class SplashHome extends Component {
  constructor() {
    super()
    this.state = {
      forgotPass: false
    }
  }

  render() {
    const { match } = this.props;
    console.log('MATCH:',match);
    return (
      <ApolloProvider client={client}>
        <App centered={false}>
          <BrowserRouter>
              <div className="grommetux-box grommetux-box--direction-column grommetux-box--responsive grommetux-box--pad-none grommetux-box--flex-off">
              <Header className="grommetux-box grommetux-box--direction-row grommetux-box--justify-center grommetux-box--align-center grommetux-box--pad-horizontal-none grommetux-box--pad-vertical-none grommetux-box--pad-between-small grommetux-background-color-index-neutral-4 grommetux-background-color-index--dark grommetux-header" fixed={false}
                float={false}
                size='medium'
                splash={false}
                style={{ background: "#FFF" }} >
                <div className="grommetux-box grommetux-box--direction-row grommetux-box--justify-start grommetux-box--align-center grommetux-box--flex-grow grommetux-box--pad-horizontal-medium grommetux-box--width-max-xxlarge grommetux-box--width-max">
                  <img width="80" height="80" src="https://visualpharm.com/assets/2/Badger-595b40b75ba036ed117d8786.svg"/>
                  <div className="grommetux-box grommetux-box--direction-column grommetux-box--responsive grommetux-box--pad-small"></div>
                  <nav className="grommetux-box grommetux-box--direction-row grommetux-box--responsive grommetux-box--flex-grow grommetux-box--pad-none grommetux-menu grommetux-menu--row grommetux-menu--inline">
                    <Link to={'/home'}>
                      <a style={{ color: "#000" }} class="grommetux-anchor">About</a>
                    </Link>
                    <Link to={'/SplashSignIn'}>
                      <a style={{ color: "#000" }} class="grommetux-anchor">Sign In</a>
                    </Link>
                    <Link to={'/SplashSignUp'}>
                      <a style={{ color: "#000" }} class="grommetux-anchor">Sign Up</a>
                    </Link>
                  </nav>
                  <Box flex={true}
                    justify='end'
                    direction='row'
                    responsive={false}>
                  </Box>
                </div>
              </Header>
              <Switch>
                <Route exact={true} path="/home" render={() => (
                  <Splash client={client} />
                )} />
                <Route exact={true} path="/SplashSignIn" render={() => (
                  <SplashSignIn client={client} />
                )} />
                <Route exact={true} path="/SplashSignUp" render={() => (
                  <SplashSignUp client={client} />
                )} />
                <Route exact={true} path="/PasswordRecovery" render={() => (
                  <PasswordRecoveryModal />
                )} />
                <Route path='/PasswordResetPage/:id' component={PasswordResetPage}/>
              </Switch>
            </div>
          </BrowserRouter>
        </App>
      </ApolloProvider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
    return (
      ReactDOM.render(
      <SplashHome />,
        document.getElementById('splash')
      )
    )
})