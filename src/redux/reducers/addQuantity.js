import { ADD_QUANTITY } from "../actions/actionTypes"
import { initialState } from "./initialState"


export default addQuantityReducer = (state = [], aciton) => {
    switch (aciton.type) {
        case ADD_QUANTITY: return {
            state
        }
        default: return state
    }
}

