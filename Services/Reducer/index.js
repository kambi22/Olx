import { combineReducers } from "redux";
import cardItems from "./reducer";


 const rootRducer = combineReducers({
    cardItems,
})
export default rootRducer;