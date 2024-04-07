import axios from 'axios';
import { setAlert } from './alert';
// import { setAlert} from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
} from './types';

//Get current users profile
export const getCurrentProfile=()=> async dispatch=>{
    try {
      const res= await axios.get('/api/profile/me');

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText , status:err.response.status}
      });
    }
};

// Get all profiles
export const getProfiles=()=> async dispatch=>{
  dispatch({ type: CLEAR_PROFILE});
  try {
    const res= await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText , status:err.response.status}
    });
  }
};

// Get profile by ID
export const getProfileById= userId=> async dispatch=>{
  try {
    const res= await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText , status:err.response.status}
    });
  }
};

// Get Github repos
export const getGithubRepos=username=> async dispatch=>{
  try {
    const res= await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText , status:err.response.status}
    });
  }
};

//Create or update profile
export const createProfile = (formdata , history , edit=false)=> async dispatch=>{
  try {
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }

    const res =await axios.post('/api/profile',formdata,config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created' , 'success'));

    if(!edit){
      history.push('/dashboard');
      // return <Navigate to='/dashboard'></Navigate>
    }
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log(err);

    if (err.response) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }, // check this one
      });
    } else {
      // Handle error when err.response is undefined
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: 'An error occurred', status: 500 }, // check this one
      });
   }
  }
};

//Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);
    
    // Log the response for debugging
    console.log(res);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    console.log(err); // Log the entire error object for debugging

    if (err.response) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    } else {
      // Handle error when err.response is undefined
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: 'An error occurred', status: 500 }
      });
    }
  }
};



//Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);
    
    // Log the response for debugging
    console.log(res);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    console.log(err); // Log the entire error object for debugging

    if (err.response) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    } else {
      // Handle error when err.response is undefined
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: 'An error occurred', status: 500 }
      });
    }
  } 
};


//Delete experience
export const deleteExperience = id=> async dispatch=>{
  try{
    const res=await axios.delete(`api/profile/experience/${id}`);
    console.log(res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed' , 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText , status:err.response.status}
    });
  }
};

//Delete education
export const deleteEducation = id=> async dispatch=>{
  try{
    const res=await axios.delete(`api/profile/education/${id}`);
    console.log(res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed' , 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText , status:err.response.status}
    });
  }
};

//Delete account & profile
export const deleteAccount = () => async dispatch=>{
  if(window.confirm('Are you sure? This can NOT be undone')){
  try{
    await axios.delete('/api/profile');
    dispatch({type: CLEAR_PROFILE});
    dispatch({type: ACCOUNT_DELETED});

    dispatch(setAlert('Your account has been permanantly deleted'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText , status:err.response.status}
    });
  }
 }
};