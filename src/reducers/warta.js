import {
  FETCH_WARTA_BY_MONTH,
  FETCH_WARTA_BY_MONTH_SUCCESS,
  FETCH_WARTA_BY_MONTH_FAILURE
} from '../actions';

const initialState = {
  wartaData: {
    month: '',
    year: '',
    month_data: []
  },

  isFetching: false,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WARTA_BY_MONTH:
      return { ...state, isFetching: true, isError: false };
    case FETCH_WARTA_BY_MONTH_SUCCESS:
      return {
        ...state,
        wartaData: { ...action.data },
        isFetching: false,
        isError: false
      };
    case FETCH_WARTA_BY_MONTH_FAILURE:
      return { ...state, isFetching: false, isError: true };

    default:
      return state;
  }
};
