import {
  ActionTypes,
  FETCH_TODAY_CHAPTER,
  FETCH_TODAY_CHAPTER_SUCCESS,
  FETCH_TODAY_CHAPTER_FAILURE,
  FETCH_CHAPTER_BY_DATE,
  FETCH_CHAPTER_BY_DATE_SUCCESS,
  FETCH_CHAPTER_BY_DATE_FAILURE,
} from '../actions'

const initialState = {
  chapters: { passage: [], pl: [], pb: [], alt: [] },

  isFetching: false,
  isError: false,
}

const bibleReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    // Fetching
    case FETCH_TODAY_CHAPTER:
    case FETCH_CHAPTER_BY_DATE:
      return { ...state, isFetching: true, isError: false }

    // Failure
    case FETCH_TODAY_CHAPTER_FAILURE:
    case FETCH_CHAPTER_BY_DATE_FAILURE:
      return { ...state, isFetching: false, isError: true }

    // Success
    case FETCH_TODAY_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: { ...action.data },
        isFetching: false,
        isError: false,
      }
    case FETCH_CHAPTER_BY_DATE_SUCCESS:
      return {
        ...state,
        chapters: { ...action.data },
        isFetching: false,
        isError: false,
      }

    default:
      return state
  }
}

export default bibleReducer
