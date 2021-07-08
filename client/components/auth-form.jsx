import React from 'react';
import axios from 'axios';
import Error from './error';
import { checkPassword } from '../lib';
export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'guest',
      password: 'guest',
      usernameIcon: 'hidden',
      passwordIcon: 'hidden',
      errorUser: '',
      errorReq: '',
      errorLogin: '',
      networkError: false,
      script: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreds = this.handleCreds.bind(this);
  }

  handleDemo() {
    if (window.location.hash === 'sign-in') {
      return 'guest';
    } else {
      return event.target.value;
    }
  }

  handleCreds() {
    const { username, password } = this.state;
    if (password.length > 0 && password.length < 8) {
      this.setState({
        passwordIcon: 'invalid-icon fas fa-times', errorReq: ''
      });
    } else if (password.length >= 8 && !checkPassword(password)) {
      this.setState({
        passwordIcon: 'invalid-icon fas fa-times', errorReq: 'Password does not meet the requirements'
      });
    } else if (password.length >= 8) {
      this.setState({
        passwordIcon: 'valid-icon fas fa-check', errorReq: ''
      });
    } else {
      this.setState({
        passwordIcon: 'hidden', errorReq: ''
      });
    }
    if (username.length === 0) {
      this.setState({
        usernameIcon: 'hidden', errorUser: ''
      });
    } else if (!username.match('^[0-9a-zA-Z]+$')) {
      this.setState({
        usernameIcon: 'invalid-icon fas fa-times', errorUser: 'No special characters'
      });
    } else if (username.length < 6) {
      this.setState({
        usernameIcon: 'invalid-icon fas fa-times', errorUser: ''
      });
    } else {
      this.setState({
        usernameIcon: 'valid-icon fas fa-check', errorUser: ''
      });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { action } = this.props;
    if (action === 'sign-up') {
      this.setState({ [name]: value }, this.handleCreds);
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const { errorUser, errorReq, username, password } = this.state;
    if (errorUser || errorReq) {
      this.handleCreds();
      return;
    }

    axios.post(`/api/auth/${action}`, { username, password }).then(response => {
      if (response.data === 23505) {
        this.setState({ errorUser: 'Please select new username' });
      } else {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
          this.setState({ script: 'Account has been successfully registered' });
        } else if (response.data.user && response.data.token) {
          this.setState({ script: '' });
          this.props.onSignIn(response.data);
        } else {
          this.setState({ errorLogin: 'Invalid Login Credentials' });
        }
      }
    }).catch(err => {
      this.setState({ networkError: true });
      console.error(err);
    });
  }

  passwordReq() {
    const { action } = this.props;
    if (action === 'sign-up') {
      return (
      <div className="row kick-off-container ">
        <h3 className= "font-heading">Password Requirements</h3>
        <ul className="font-secondary">
          <li>Eight or more characters</li>
          <li>One or more capital letters</li>
          <li>One or more numbers</li>
          <li>One or more special characters</li>
        </ul>
      </div>
      );
    } else {
      return null;
    }
  }

  signUpMessage() {
    const { action } = this.props;
    const { script } = this.state;
    if (action === 'sign-in' && script !== '') {
      return (
        <div className="row center ">
        <h3 className= "font-heading">{script}</h3>
      </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const demoUsername = value => {
      if (window.location.hash === '#sign-in' || window.location.hash === '') {
        return this.state.username;
      } else {
        return value;
      }
    };
    const demoPassword = value => {
      if (window.location.hash === '#sign-in' || window.location.hash === '') {
        return this.state.password;
      } else {
        return value;
      }
    };

    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const { errorLogin, usernameIcon, passwordIcon, errorUser, errorReq, networkError } = this.state;
    if (networkError) {
      return <Error/>;
    }
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (

      <>
      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor="username">
            Username
          </label>
          <input
            required
            autoFocus
            id="username"
            min="4"
            type="text"
            name="username"
            value= {demoUsername(this.value)}
            onChange={handleChange}
            className="login-input" />
            <i className = {usernameIcon}></i>
           <p className = "text-center">
             {errorUser}
             </p>
        </div>
        <div>
          <label htmlFor="password" >
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            min="8"
            max="16"
            value = {demoPassword(this.value)}
            name="password"
            onChange={handleChange}
            className="login-input" />
            <i className = {passwordIcon}>
            </i>
            <p className= "text-center">
              {errorReq}
            </p>
        </div>
        <div className ="center-button">
          <button type="submit" className="enter-button ">
            { submitButtonText }
          </button>
        </div>
      </form>
      {
        errorLogin
          ? <span className = "Lost">{errorLogin}</span>
          : null
      }
      {this.passwordReq()}
      {this.signUpMessage()}
      </>
    );
  }
}
