import { CHANGE_CHAR_LIST_PAGE_NUM } from "../constants";
import { CHANGE_RESULTS_PER_PAGE } from "../constants";

export const changeCharListPage = newPageNum => ({
  type: CHANGE_CHAR_LIST_PAGE_NUM,
  payload: newPageNum
});

export const changeResultsPerPage = num => ({
  type: CHANGE_RESULTS_PER_PAGE,
  payload: num
});
