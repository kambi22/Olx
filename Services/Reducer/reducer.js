import { ADD_IMAGE, ADD_TO_CART } from "../Constant";
import { UPDATE_STATE } from "../Constant";
const initialState = {
    stateData: '',
    stateupdate: '',
}

export default function cardItems(state= initialState,action){
    switch (action.type){
        case ADD_TO_CART:
  
            return{
                ...state,
                stateData:action.payload,
            }
        case UPDATE_STATE:

            return{
                ...state,
                stateupdate:action.payload,
            }
            default:
                return state
    }
    
}

