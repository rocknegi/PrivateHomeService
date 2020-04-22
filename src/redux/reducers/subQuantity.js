import {  SUB_QUANTITY } from "../actions/actionTypes"

export const subQuantityReducer = (state=[],aciton)=>{
    switch(aciton.type){
        case SUB_QUANTITY : return{

        }
        default: return state
    }
}