import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const weclomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
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
            <p className="text-muted mb-4">{ weclomeMessage }</p>
            </div>
            <div className="input-container">
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
