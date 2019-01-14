import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utilities/setAuthToken';
import jwt_decode from 'jwt-decode'

// Register user
export const registerUser = (userData, history) => dispatch => {
    //Post request to server
    axios.post('http://localhost:5000/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err => {
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          });
      });
}

// Login user
export const loginUser = userData => dispatch => {
    //Login request to the server
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            //Get the token
            const { token } = res.data;

            //Save token to the localstorage
            localStorage.setItem('jwtToken', token);

            //Set token to the Auth Header
            setAuthToken(token);

            //Decode the token and get user data
            const decodedUserData = jwt_decode(token);

            //Set the current user state
            dispatch(setCurrentUser(decodedUserData));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setCurrentUser = decodedUserData => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedUserData
    }
};

export const logoutUser = () => dispatch => {
    //Remove token from localStorage
    localStorage.removeItem('jwt-token');

    //Remove authorization header from requests
    setAuthToken(false);

    //Set current user to empty and isAuthenticated to false
    dispatch(setCurrentUser({}));
};