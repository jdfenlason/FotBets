import React from 'react';
import axios from 'axios';
import { checkPassword } from '../lib';
export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameIcon: 'hidden',
      passwordIcon: 'hidden',
      errorUser: '',
      errorReq: '',
      errorMatch: '',
      errorLogin: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreds = this.handleCreds.bind(this);
  }

  handleCreds() {
    const { username, password } = this.state;
    if (password.length > 0 && password.length < 8) {
      this.setState({
        passwordIcon: 'invalid-icon fas fa-times', errorReq: ''
      });
    } else if (password.length >= 8 && !checkPassword(password)) {
      this.setState({
        passwordIcon: 'invalid-icon fas fa-times', errorReq: 'Password doesn\'t meet the requirements'
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
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const { username, password } = this.state;
    axios.post(`/api/auth/${action}`, { username, password }).then(response => {
      if (action === 'sign-up') {
        window.location.hash = 'sign-in';
      } else if (response.data.user && response.data.token) {
        this.props.onSignIn(response.data);
      }
    });
  }

  passwordReq() {
    const { action } = this.props;
    if (action === 'sign-up') {
      return (
      <div>
        <h4>Password Requirements</h4>
        <ul>
          <li>8 or more characters</li>
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

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
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
            type="text"
            name="username"
            onChange={handleChange}
            className="login-input" />
        </div>
        <div>
          <label htmlFor="password" >
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            className="login-input" />
        </div>
        <div className ="center-button">
          <button type="submit" className="enter-button ">
            { submitButtonText }
          </button>
        </div>
      </form>
      {this.passwordReq()}
      </>
    );
  }
}
