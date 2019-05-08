import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Register extends Component {
  
  state = {
    username : '',
    password : '',
    password2 : ''
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("submit")
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })
  
  render() {
    const { username, password, password2 } = this.state;
    return (
      <div>
        <h2>Register</h2>
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
            <label>password2</label>
            <input
              type="text"
              className="form-control"
              name="password2"
              onChange={this.onChange}
              value={password2}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <div>
            <p>Already have an account?</p> 
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    )
  }
}
