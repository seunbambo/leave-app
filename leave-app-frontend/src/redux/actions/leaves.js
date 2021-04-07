import {
  GET_ALL_LEAVES,
  UPDATE_TABLE_ENTRIES,
  SELECTED_LEAVE,
  SET_ERROR,
} from '../types';
import { getAllLeaves } from '../../services/leave.service';

export const allLeaves = () => async (dispatch) => {
  try {
    const allLeaves = await getAllLeaves();
    const { leaves } = allLeaves.data;
    dispatch({
      type: GET_ALL_LEAVES,
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

export const updateTableEntries = (entryNumber) => async (dispatch) => {
  dispatch({
    type: UPDATE_TABLE_ENTRIES,
    payload: entryNumber,
  });
};

export const selectedLeave = (leave) => async (dispatch) => {
  dispatch({
    type: SELECTED_LEAVE,
    payload: leave,
  });
};

export const clearSelectedLeave = () => async (dispatch) => {
  dispatch({
    type: SELECTED_LEAVE,
    payload: null,
  });
};
