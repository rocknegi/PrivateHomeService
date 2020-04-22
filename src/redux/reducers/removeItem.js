import {  REMOVE_ITEM} from "../actions/actionTypes"

export const removerFromCartReducer = (state=[],aciton)=>{
    switch(action.type){
        case REMOVE_ITEM:return{

        }
        default: return state
    }
}
