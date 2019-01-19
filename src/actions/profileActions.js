import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from "./types";

//Get current profile of the user
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    //Get from service
    axios.get('http://localhost:5000/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            }));
}

//Create user profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('http://localhost:5000/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Delete user Account
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!')) {
        axios
            .delete('http://localhost:5000/api/profile')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                }))
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}