import { createStore } from 'redux';

// Define the initial state
const initialState = {
  botName: '',
  fileNames: [],
};

// Define the action types
const SET_BOT_NAME = 'SET_BOT_NAME';
const SET_FILE_NAMES = 'SET_FILE_NAMES'; // Add this line

// Define the reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOT_NAME:
      return { ...state, botName: action.payload };
    case SET_FILE_NAMES: // Add this case
      return { ...state, fileNames: action.payload };
    default:
      return state;
  }
}

// Define the action creators
export const setBotName = (botName) => {
  return {
    type: SET_BOT_NAME,
    payload: botName,
  };
};

export const setFileNames = (fileNames) => { // Add this function
  return {
    type: SET_FILE_NAMES,
    payload: fileNames,
  };
};

// Create the store
export const store = createStore(reducer);