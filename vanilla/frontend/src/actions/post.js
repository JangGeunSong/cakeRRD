import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_POST, DELETE_POST, ADD_POST } from './types';

// GET POSTS
export const getPost = () => dispatch => {
    axios.get('/')
    .then(response => {
        dispatch({
            type : GET_POST,
            payload : response.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE POSTs
export const deletePost = id => dispatch => {
    axios.delete(`/${id}/`)
    .then(response => {
        dispatch(createMessage({ deletePost: 'Post Deleted' }));
        dispatch({
            type : DELETE_POST,
            payload : id
        });
    })
    .catch(err => console.log(err));
}

// ADD_POST
export const addPost = (post) => dispatch => {
    axios.post(`/`, post)
    .then(response => {
        dispatch(createMessage({ addPost: 'Post Added' }));
        dispatch({
            type : ADD_POST,
            payload : response.date
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// 반드시 ADMIN 에서 LOGOUT 을 해야 정확히 
// 네트워크 연결이 되어 통신이 가능함 ADMIN 이 
// 로그인 되어 있다는것은 현재 웹 서버를 점검중이라는 
// 의미로 받아들여져서 통신 불가능 상태로 전환시킴.