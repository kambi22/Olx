import { ADD_TO_CART } from "../Constant";
import { UPDATE_STATE } from "../Constant";
import { ADD_IMAGE } from "../Constant";
export const addToCart = (stateData)=>{
   console.log('action',stateData)
    return {
        type:ADD_TO_CART,
        payload:stateData
    }
}
export const updateToCart = (stateData)=>{

    return {
        type:UPDATE_STATE,
        payload:stateData
    }
}
