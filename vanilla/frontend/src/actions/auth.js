import axios from 'axios'
import { returnErrors } from './messages'

import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR, 
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
    .then(response => {
        dispatch({
            type : USER_LOADED,
            payload : response.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type : AUTH_ERROR
        });
    })
}

// LOGIN USER
export const login = (username, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config)
    .then(response => {
        dispatch({
            type : LOGIN_SUCCESS,
            payload : response.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type : LOGIN_FAIL
        });
    })
}

export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState))
    .then(response => {
        dispatch({
            type : LOGOUT_SUCCESS,
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type : AUTH_ERROR
        });
    })
}

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    // If token, add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}

// REGISTER USER
export const register = ({ username, password }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/register', body, config)
    .then(response => {
        dispatch({
            type : REGISTER_SUCCESS,
            payload : response.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type : REGISTER_FAIL
        });
    })
}
