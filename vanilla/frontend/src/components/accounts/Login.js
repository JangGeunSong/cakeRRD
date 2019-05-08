import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    username : '',
    password : '',
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("submit")
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })
  
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div>
            <p>Don't have an account?</p> 
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    )
  }
}
