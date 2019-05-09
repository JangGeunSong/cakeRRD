import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

export class Login extends Component {
  state = {
    username : '',
    password : '',
  }

  static propTypes = {
    login : PropTypes.func.isRequired,
    isAutheticated : PropTypes.bool
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password)
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })
  
  render() {
    if(this.props.isAutheticated) {
      return <Redirect to="/" />
    }
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
              type="password"
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

const mapStateToProps = state => ({
  isAutheticated : state.auth.isAutheticated,
})

export default connect(mapStateToProps, { login })(Login)