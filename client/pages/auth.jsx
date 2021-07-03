import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {

  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="home" />;
    if (route.path === '') {
      route.path = 'sign-up';
    }
    const weclomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
    const alternateActionText = route.path === 'sign-up'
      ? 'Sign in instead'
      : 'Create an Account';
    const alternateActionHref = route.path === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    return (
      <>
      <div className="overlay"></div>
      <div className="bg-image sign-bg">
          <div className="title title-row">

            <span className="large">
              <h2>
                F<i className="fas fa-futbol logoSize"></i>tBets
              </h2>
            </span>
            <p className="">{ weclomeMessage }</p>

            <a className="change-auth" href={alternateActionHref}>
              {` or ${alternateActionText}`}
            </a>
            </div>
            <div className="auth index">
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
              </div>
          </div>
</>
    );
  }
}
AuthPage.contextType = AppContext;
