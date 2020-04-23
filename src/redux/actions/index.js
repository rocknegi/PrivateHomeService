import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY ,SUB_OPTION, ADD_OPTION} from "./actionTypes"

export const addToCart = (id)=>{
    return{
        type:ADD_TO_CART,
        id
    }
}

export const removeFromCart = (id)=>{
    return{
        type:REMOVE_ITEM,
        id
    }
}

export const addQuantity = (id)=>{
    return{
        type:ADD_QUANTITY,
        id
    }
}

export const subQuantity = (id)=>{
    return{
        type:SUB_QUANTITY,
        id
    }
}

export const subOption = (id)=>{
    return{
        type:SUB_OPTION,
        id
    }
}

export const addOption = (id)=>{
    return{
        type:ADD_OPTION,
        id
    }
}