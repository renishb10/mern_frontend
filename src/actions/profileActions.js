import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from "./types";

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