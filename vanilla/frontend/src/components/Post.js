import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPost, deletePost } from '../actions/post'

class Post extends Component {
  static propTypes = {
    post : PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    deletePosts: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getPost();
  }

  render() {
    return (
      <Fragment>
        <h2>Post</h2>
        { this.props.post.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <img src={item.Image}></img>
            <p>{item.descripttion}</p>
            <button onClick={this.props.deletePost.bind(this, item.id)} className="btn btn-dnager btn-sm">
              Delete
            </button>
          </div>
        )) }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  post : state.post.post
});

export default connect(mapStateToProps, { getPost, deletePost })(Post);