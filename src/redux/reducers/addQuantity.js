import {  ADD_QUANTITY } from "../actions/actionTypes"


export const addQuantityReducer = (state=[],aciton)=>{
    switch(aciton.type){
        case ADD_QUANTITY:return{

        }
        default:return state
    }
}

