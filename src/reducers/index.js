import { combineReducers } from "redux";
import { charListPageNum } from "./charListPageNum";
import { resultsPerPage } from "./resultsPerPage";

const rootReducer = combineReducers({ charListPageNum, resultsPerPage });

export default rootReducer;
