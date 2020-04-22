import { ADD_TO_CART } from "../actions/actionTypes"
import { initialState } from "./initialState"

export default addToCartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART: 
            return state
        default:  return state

    }
}

