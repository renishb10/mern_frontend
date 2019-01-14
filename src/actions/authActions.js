import axios from 'axios';
import { GET_ERRORS } from './types';

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