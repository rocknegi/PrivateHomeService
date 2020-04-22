import { ADD_TO_CART } from "../actions/actionTypes"

export const addToCartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART: return {

        }
        default: return state
    }
}

