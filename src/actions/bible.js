import {
  FETCH_TODAY_CHAPTER,
  FETCH_CHAPTER_BY_DATE,
  // 2020
  FETCH_TODAY_CHAPTER2020,
  FETCH_CHAPTER2020_BY_DATE
} from './index';

export const fetchTodayChapter = () => {
  return { type: FETCH_TODAY_CHAPTER };
};

export const fetchChapterByDate = date => {
  return { type: FETCH_CHAPTER_BY_DATE, date };
};

// 2020
export const fetchTodayChapter2020 = version => {
  return { type: FETCH_TODAY_CHAPTER2020, version };
};

export const fetchChapter2020ByDate = date => {
  return { type: FETCH_CHAPTER2020_BY_DATE, date };
};
