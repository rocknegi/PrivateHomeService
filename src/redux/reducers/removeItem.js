import { REMOVE_ITEM } from "../actions/actionTypes"
import { initialState } from "./initialState"

export default removerFromCartReducer = (state = [], action) => {
    switch (action.type) {
        case REMOVE_ITEM: return {
            state
        }
        default: return state
    }
}
