import {
  FETCH_TODAY_CHAPTER,
  FETCH_TODAY_CHAPTER_SUCCESS,
  FETCH_TODAY_CHAPTER_FAILURE,
  ActionTypes,
} from '../actions'

const initialState = {
  chapters: { passage: [], pl: [], pb: [], alt: [] },

  isFetching: false,
  isError: false,
}

export default (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FETCH_TODAY_CHAPTER:
      return { ...state, isFetching: true, isError: false }
    case FETCH_TODAY_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: { ...action.data },
        isFetching: false,
        isError: false,
      }
    case FETCH_TODAY_CHAPTER_FAILURE:
      return { ...state, isFetching: false, isError: true }

    default:
      return state
  }
}
