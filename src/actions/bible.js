import { FETCH_TODAY_CHAPTER, FETCH_CHAPTER_BY_DATE } from './index';

export const fetchTodayChapter = () => {
  return { type: FETCH_TODAY_CHAPTER };
};

export const fetchChapterByDate = date => {
  return { type: FETCH_CHAPTER_BY_DATE, date };
};
