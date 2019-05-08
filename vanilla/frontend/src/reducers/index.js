import { combineReducers } from 'redux';
import post from './post'
import errors from './errors'
import messages from './messages'
import auth from './auth'

export default combineReducers({
    post,
    errors,
    messages,
    auth
});