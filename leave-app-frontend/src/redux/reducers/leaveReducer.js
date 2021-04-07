import {
  GET_USER_LEAVES,
  GET_ALL_LEAVES,
  UPDATE_TABLE_ENTRIES,
  SELECTED_LEAVE,
} from '../types';

const intialState = {
  userLeaves: [],
  leaves: [],
  selectedLeave: null,
  entries: 0,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_USER_LEAVES:
      return {
        ...state,
        userLeaves: action.payload,
      };
    case GET_ALL_LEAVES:
      return {
        ...state,
        leaves: action.payload,
      };
    case UPDATE_TABLE_ENTRIES:
      return {
        ...state,
        entries: action.payload,
      };
    case SELECTED_LEAVE:
      return {
        ...state,
        selectedLeave: action.payload,
      };
    default:
      return state;
  }
};
