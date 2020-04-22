import {  SUB_QUANTITY } from "../actions/actionTypes"
import { initialState } from "./initialState"

export default subQuantityReducer = (state=[],aciton)=>{
    switch(aciton.type){
        case SUB_QUANTITY : return{
            state
        }
        default: return state
    }
}