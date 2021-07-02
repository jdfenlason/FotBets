import React from 'react';
import axios from 'axios';
export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Create an Account';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (
      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="username" className="form-label">
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
        <div className="">
          <label htmlFor="password" className="form-label">
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
        <div className="">
          <small>
            <a className="" href={alternateActionHref}>
              { alternatActionText }
            </a>
          </small>
          <button type="submit" className="enter-button">
            { submitButtonText }
          </button>
        </div>
      </form>
    );
  }
}
