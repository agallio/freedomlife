import {
  FETCH_TODAY_CHAPTER,
  FETCH_TODAY_CHAPTER_SUCCESS,
  FETCH_TODAY_CHAPTER_FAILURE,
  FETCH_CHAPTER_BY_DATE,
  FETCH_CHAPTER_BY_DATE_SUCCESS,
  FETCH_CHAPTER_BY_DATE_FAILURE,
  FETCH_TODAY_CHAPTER2020,
  FETCH_TODAY_CHAPTER2020_SUCCESS,
  FETCH_TODAY_CHAPTER2020_FAILURE,
  FETCH_CHAPTER2020_BY_DATE,
  FETCH_CHAPTER2020_BY_DATE_SUCCESS,
  FETCH_CHAPTER2020_BY_DATE_FAILURE
} from '../actions';

const initialState = {
  chapters: { passage: [] },

  isFetching: false,
  isError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODAY_CHAPTER:
    case FETCH_CHAPTER_BY_DATE:
    case FETCH_TODAY_CHAPTER2020:
    case FETCH_CHAPTER2020_BY_DATE:
      return { ...state, isFetching: true, isError: false };
    case FETCH_TODAY_CHAPTER_SUCCESS:
    case FETCH_CHAPTER_BY_DATE_SUCCESS:
    case FETCH_TODAY_CHAPTER2020_SUCCESS:
    case FETCH_CHAPTER2020_BY_DATE_SUCCESS:
      return {
        ...state,
        chapters: { ...action.data },
        isFetching: false,
        isError: false
      };
    case FETCH_TODAY_CHAPTER_FAILURE:
    case FETCH_CHAPTER_BY_DATE_FAILURE:
    case FETCH_TODAY_CHAPTER2020_FAILURE:
    case FETCH_CHAPTER2020_BY_DATE_FAILURE:
      return { ...state, isFetching: false, isError: true };

    default:
      return state;
  }
};
