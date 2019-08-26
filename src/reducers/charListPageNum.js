import { CHANGE_CHAR_LIST_PAGE_NUM } from "../constants";

const initalState = {
  charListPageNum: 1
};

export const charListPageNum = (state = initalState, action) => {
  switch (action.type) {
    case CHANGE_CHAR_LIST_PAGE_NUM:
      return { ...state, charListPageNum: action.payload };
    default:
      return state;
  }
};
