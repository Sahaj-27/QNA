import { createStore } from 'redux';

const initialState = {
  botName: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOT_NAME':
      return { ...state, botName: action.payload };
    default:
      return state;
  }
}

export const store = createStore(reducer);