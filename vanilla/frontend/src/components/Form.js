import React, { Component } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../actions/post'
import { Link } from 'react-router-dom'
import { logout } from '../actions/auth'

class Form extends Component {
  state = {
    name: '',
    descripttion: '',
    Image: ''
  };

  static propTypes = {
    addPost: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, descripttion, Image } = this.state;
    const post = { name, descripttion, Image };
    this.props.addPost(post);
    this.setState({
      name: "",
      descripttion: "",
      Image: ""
    })
  }

  Dropzone() {
    const [getRootProps, getInputProps, open, acceptedFiles] = useDropzone({
      noClick: true,
      noKeyboard: true
    });

    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    return (
      <div className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
          <button type="button" onClick={open()}>
            Open File Dialog
          </button>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    )
  }

  render() {
    const { name, descripttion, Image } = this.state;
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
        <ul>
          <span>
            <strong>
              { user ? `Welcome ${user.username}` : ""}  
            </strong>            
          </span>
          <li>
            <button onClick={this.props.logout}>
              Logout
            </button>
          </li>
        </ul>
    )

    const guestLinks = (
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
      <div>
        <h2>Add Article</h2>
        { isAuthenticated ? authLinks : guestLinks }
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>description</label>
            <textarea
              className="form-control"
              type="text"
              name="descripttion"
              onChange={this.onChange}
              value={descripttion}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <textarea
              className="form-control"
              type="text"
              name="Image"
              onChange={this.onChange}
              value={Image}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth : state.auth
})

export default connect(mapStateToProps, { addPost, logout })(Form);