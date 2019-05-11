import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages'

export class Register extends Component {
  
  state = {
    username : '',
    password : '',
    password2 : ''
  }

  static propTypes = {
    register : PropTypes.func.isRequired,
    isAutheticated : PropTypes.bool
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, password, password2 } = this.state
    if(password !== password2) {
      this.props.createMessage({ passwordNotMatch : 'Passwords do not match' })
    }
    else {
      const newUser = {
        username,
        password
      }
      this.props.register(newUser)
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })
  
  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    }
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
              type="password"
              className="form-control"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label>password2</label>
            <input
              type="password"
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

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(Register)