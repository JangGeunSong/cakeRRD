import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Alert extends Component {
    static propTypes = {
        error : PropTypes.object.isRequired,
        message : PropTypes.object.isRequired
    }

    componentDidUpdate(previousProps) {
        const { error, alert, message } = this.props;
        if(error !== previousProps.error) {
            if(error.msg.name) alert.error(`Name: ${error.msg.name.join()}`)
            if(error.msg.descripttion) alert.error(`Description: ${error.msg.descripttion.join()}`)
            if(error.msg.Image) alert.error(`Image: ${error.msg.Image.join()}`)
        }

        if(message !== previousProps.message) {
            if(message.deletePost) alert.success(message.deletePost);
            if(message.addPost) alert.success(message.addPost);
        }
    }

    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alert))