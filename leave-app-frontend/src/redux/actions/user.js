import { GET_USER, SET_ERROR, GET_USER_LEAVES } from '../types';
import { getUserData } from '../../services/user.service';

export const getUser = () => async (dispatch) => {
  try {
    const userData = await getUserData();
    const { user } = userData.data;
    dispatch({
      type: GET_USER,
      payload: user,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data.message,
      });
    }
  }
};

export const getUserLeaves = () => async (dispatch) => {
  try {
    const userData = await getUserData();
    const { leaves } = userData.data.user;
    dispatch({
      type: GET_USER_LEAVES,
      payload: leaves,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data.message,
      });
    }
  }
};
