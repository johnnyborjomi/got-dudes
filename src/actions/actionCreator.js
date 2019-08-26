import { CHANGE_CHAR_LIST_PAGE_NUM } from "../constants";

export const changeCharListPage = newPageNum => ({
  type: CHANGE_CHAR_LIST_PAGE_NUM,
  payload: newPageNum
});
