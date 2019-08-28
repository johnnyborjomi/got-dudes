import { CHANGE_RESULTS_PER_PAGE } from "../constants";

const initialState = {
  resultsPerPage: 10
};

export const resultsPerPage = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_RESULTS_PER_PAGE:
      return { ...state, resultsPerPage: action.payload };
    default:
      return state;
  }
};
