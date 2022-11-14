// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import { ITEM_START, ITEM_SUCCESS, FETCH_ERROR, ITEM_ADD, ITEM_ERROR } from '../actions';

export const initialState = {
  items: [
    {
      category: '',
      description: '',
      item_id: '',
      location: '',
      name: '',
      price: '',
      user_id: '',
      url: '',
    },
  ],
  isLoading: false,
  fetchingError: '',
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_START:
      return {
        ...state,
        isLoading: true,
        fetchingError: '',
      };
    case ITEM_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        fetchingError: '',
      };
    case FETCH_ERROR:
      return {
        ...state,
        items: [],
        isLoading: false,
        fetchingError: action.payload,
      };
    case ITEM_ADD:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ITEM_ERROR:
        return {
          ...state,
          isLoading: false,
          fetchingError: [...state.items, action.payload],
        };
    default:
      return state;
  }
};

export default itemReducer;
